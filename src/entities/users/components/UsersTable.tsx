import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/entities/users/api";
import { User } from "@/entities/users/types";
import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UsersTable() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [filters, setFilters] = useState({
    name: "",
    // add more filters in the future if needed + connect to the elements
  });

  const debouncedFilters = useDebounce(filters, 300);
  
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      return user.name.toLowerCase().includes(debouncedFilters.name.toLowerCase());
    })
  }, [users, debouncedFilters]);

  if (isLoading) return <p className="p">Loading users...</p>;
  if (error) return <p className="p">Error fetching users</p>;
  if (!users || users.length === 0) return <p className="p">No users found.</p>;

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end justify-between mb-4">
        <div>
          <Button
            onClick={() => {

            }}
          >
            Create User
          </Button>
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
            <tr key={user.id}>
              <td className="border px-2 py-1">{user.id}</td>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.gender}</td>
              <td className="border px-2 py-1">{user.banned ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}