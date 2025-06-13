import { User } from "@/entities/users/types";
import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateUserForm } from "./CreateUserForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { EditUserForm } from "./EditUserForm";
import { useUpdateUser } from "../hooks";
import { useUsers, useDeleteUser } from "../hooks";

export function UsersTable() {
  const { data: users, isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();
  
  const [filters, setFilters] = useState({
    name: "",
    // add more filters in the future if needed + connect to the elements
  });
  const debouncedFilters = useDebounce(filters, 300);

  
  const [mode, setMode] = useState<"none" | "edit" | "delete" | "ban">("none");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      return user.name.toLowerCase().includes(debouncedFilters.name.toLowerCase());
    })
  }, [users, debouncedFilters]);

  if (isLoading) return <p className="p">Loading users...</p>;
  if (error) return <p className="p">Error fetching users</p>;
  if (!users || users.length === 0) return <p className="p">No users found.</p>;
      
  function deleteUser(id: string) {
    deleteUserMutation.mutate(id, { 
      onSuccess: () => {
        toast("User deleted!", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        })
      },
    });
  }
  
  // function hammerUser(id: string) {
  //   const data = {
  //     name: hammerredUser.data?.name || "",
  //     gender: hammerredUser.data?.gender,
  //     banned: !hammerredUser.data?.banned,
  //   };
  
  //   updateUserMutation.mutate({id: hammerredUser.data?.id || "", data}, { 
  //     onSuccess: () => {
  //       toast("User {hammerredUser.data?.name} updated!", {
  //         action: {
  //         label: "Close",
  //         onClick: () => console.log("Close"),
  //         },
  //       })
  //     },
  //   });
  // };
  

  function handleRowClick(user: User) {
    switch (mode) {
      case "edit":
        setSelectedUser(user);
        setEditDialogOpen(true);
        break;
      case "delete":
        setSelectedUser(user);
        setDeleteDialogOpen(true);
        break;
      case "ban":
        setSelectedUser(user);
        updateUserMutation.mutate(
          {
            id: user.id,
            data: {
              name: user.name,
              gender: user.gender,
              banned: !user.banned,
            },
          },
          {
            onSuccess: () => {
              toast(`User ${user.name} updated!`, {
                action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
                },
              });
            },
          }
        );
        break;
      default:
        break;
    }
  }


  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end justify-between mb-4">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4">Create New User</DialogTitle>
                <CreateUserForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm">Name</label>
            <Input
              className="border p-1 rounded"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </div>
          <Button
            onClick={() => {
              const reset = { name: ""};
              setFilters(reset);
            }}
          >
            Clear Filter
          </Button>
        </div>
      </div>

      <div className="flex justify-between gap-2 mb-4">
        <div className="flex gap-2">
          <Button
            variant={mode === "edit" ? "default" : "outline"}
            onClick={() => setMode(mode === "edit" ? "none" : "edit")}
          >
            Edit
          </Button>
          <Button
            variant={mode === "delete" ? "destructive" : "outline"}
            onClick={() => setMode(mode === "delete" ? "none" : "delete")}
          >
            Delete
          </Button>
        </div>
          <Button
            variant={mode === "ban" ? "destructive" : "outline"}
            onClick={() => setMode(mode === "ban" ? "none" : "ban")}
          >
            Ban Hammer 🔨
          </Button>
      </div>

      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Gender</th>
            <th className="border px-2 py-1">Banned</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: User) => (
            <tr
              key={user.id}
              className={mode !== "none" ? "cursor-pointer tablerow" : ""}
              onClick={() => mode !== "none" && handleRowClick(user)}
            >
              <td className="border px-2 py-1">{user.id}</td>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.gender}</td>
              <td className="border px-2 py-1">{user.banned ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && <EditUserForm user={selectedUser} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-4">You are about to delete the user<br/></p>
              <p><strong>{selectedUser?.name}</strong>,<br/></p>
              <p className="mb-4">: {selectedUser?.id}.</p>
              Are you sure you want to proceed? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedUser) deleteUser(selectedUser.id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}