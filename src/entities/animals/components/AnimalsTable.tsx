import { Animal } from "@/entities/animals/types";
import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateAnimalForm } from "./CreateAnimalForm";
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
import { EditAnimalForm } from "./EditAnimalForm";
import { useAnimals, useDeleteAnimal, useUpdateAnimal } from "../hooks";

export function AnimalsTable() {
  const { data: animals, isLoading, error } = useAnimals();
  const deleteAnimalMutation = useDeleteAnimal();
  const updateAnimalMutation = useUpdateAnimal();

  const [filters, setFilters] = useState({
    name: ""
    // add more filters in the future if needed
  });
  const debouncedFilters = useDebounce(filters, 300);

  const [mode, setMode] = useState<"none" | "edit" | "delete">("none");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredAnimals = useMemo(() => {
    if (!animals) return [];

    return animals.filter((animal) =>
      animal.name.toLowerCase().includes(debouncedFilters.name.toLowerCase())
    );
  }, [animals, debouncedFilters]);

  if (isLoading) return <p className="p">Loading animals...</p>;
  if (error) return <p className="p">Error fetching animals</p>;
  if (!animals || animals.length === 0) return <p className="p">No animals found.</p>;

  function deleteAnimal(id: string) {
    deleteAnimalMutation.mutate(id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        toast("Animal deleted!", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      },
    });
  }

  function handleRowClick(animal: Animal) {
    switch (mode) {
      case "edit":
        setSelectedAnimal(animal);
        setEditFormOpen(true);
        break;
      case "delete":
        setSelectedAnimal(animal);
        setDeleteDialogOpen(true);
        break;
      default:
        break;
    }
  }

  return (
    <div className="space-y-4 max-w-3xl w-full">
      <div className="flex gap-4 items-end justify-between mb-4">
        <div>
          <Dialog open={createFormOpen} onOpenChange={setCreateFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Create Animal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4">Create New Animal</DialogTitle>
                <CreateAnimalForm onSuccess={() => setCreateFormOpen(false)} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-4 items-end">
          <div>
            <Input
              className="border px-2 rounded"
              value={filters.name}
              placeholder="Filter by name"
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </div>
          <Button
            onClick={() => setFilters({ name: "" })}
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
      </div>

      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnimals.map((animal: Animal) => (
            <tr
              key={animal.id}
              className={mode !== "none" ? "cursor-pointer tablerow" : ""}
              onClick={() => mode !== "none" && handleRowClick(animal)}
            >
              <td className="border px-2 py-1">{animal.id}</td>
              <td className="border px-2 py-1">{animal.name}</td>
              <td className="border px-2 py-1">{animal.type}</td>
              <td className="border px-2 py-1">{animal.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={editFormOpen} onOpenChange={setEditFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Animal</DialogTitle>
          </DialogHeader>
          {selectedAnimal && (
            <EditAnimalForm
              animal={selectedAnimal}
              onSuccess={() => setEditFormOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-4">
                You are about to delete the animal <strong>{selectedAnimal?.name}</strong>,
                <br />
                ID: {selectedAnimal?.id}.
              </p>
              <p>
                Are you sure you want to proceed? This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-[var(--destructive)] hover:text-white transition-colors"
              onClick={async (e) => {
                e.preventDefault();
                if (selectedAnimal) deleteAnimal(selectedAnimal.id);
              }}
            >
              {deleteAnimalMutation.isPending ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}