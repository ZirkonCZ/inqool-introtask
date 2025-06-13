import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAnimalSchema, CreateAnimalDto } from "../schema";
import { useCreateAnimal } from "../hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateAnimalForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<CreateAnimalDto>({
    resolver: zodResolver(createAnimalSchema),
  });

  const createAnimalMutation = useCreateAnimal();

  function onSubmit(values: CreateAnimalDto) {
    createAnimalMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        toast("Animal added successfully!", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        if (onSuccess) onSuccess();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Gessie" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
          />
          
        <FormField
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Age"
                  {...field}
                  value={field.value ?? ""}
                  onChange={e => field.onChange(e.target.value === "" ? undefined : +e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createAnimalMutation.isPending} className="w-32">
          {createAnimalMutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
