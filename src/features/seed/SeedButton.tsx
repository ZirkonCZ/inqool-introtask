import { useMutation, useQueryClient } from "@tanstack/react-query";
import { seedDatabase } from "./api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import axios from "axios";


export function SeedButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: seedDatabase,
    onSuccess: () => {
      toast("Database seeded successfully!", {
        action: {
        label: "Close",
        onClick: () => console.log("Close"),
        },
      }),
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast(`Error: ${error.response?.data?.message || "Unexpected error."}`);
      } else {
        toast("Unknown error out of axios scope.");
      }
    }
  });

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="lg"
        className="w-0.9"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Seeding..." : "Seed Database"}
      </Button>
    </div>
  );
}