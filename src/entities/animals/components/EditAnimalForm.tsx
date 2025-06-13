import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAnimalSchema, UpdateAnimalDto } from "../schema";
import { useUpdateAnimal } from "../hooks";
import { Animal } from "../types";
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

export function EditAnimalForm({
  animal,
  onSuccess,
}: {
  animal: Animal;
  onSuccess?: () => void;
}) {
  const form = useForm<UpdateAnimalDto>({
    resolver: zodResolver(updateAnimalSchema),
    defaultValues: {
      name: animal.name,
      type: animal.type,
      age: animal.age,
    },
  });

  const updateAnimalMutation = useUpdateAnimal();

  function onSubmit(data: UpdateAnimalDto) {
    updateAnimalMutation.mutate(
      { id: animal.id, data },
      {
        onSuccess: () => {
          form.reset();
          toast("Animal updated!", {
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
          if (onSuccess) onSuccess();
        },
      }
    );
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
                <Input defaultValue={animal.name} placeholder={animal.name} {...field} />
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
                    <SelectValue placeholder={animal.type} defaultValue={animal.type} />
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
                  placeholder={animal.age.toString()}
                  {...field}
                  value={field.value ?? ""}
                  onChange={e => field.onChange(e.target.value === "" ? undefined : +e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateAnimalMutation.isPending} className="w-32">
          {updateAnimalMutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
