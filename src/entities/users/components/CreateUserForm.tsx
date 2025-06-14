import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserSchema, CreateUserDto } from "../schema";
import { useCreateUser } from "../hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner"
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
} from "@/components/ui/select"

export function CreateUserForm({
  onSuccess
}: {
  onSuccess?: () => void;
}) {
  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
  });
  
  const createUserMutation = useCreateUser();

  function onSubmit(values: CreateUserDto) {
    createUserMutation.mutate(values, { 
      onSuccess: () => {
        form.reset();
        toast("User added successfully!", {
          action: {
          label: "Close",
          onClick: () => {},
          },
        })
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
                <Input placeholder="Vito Scaletta" {...field} />
              </FormControl>
            </FormItem>
          )}
          />

        <FormField
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[var(--btn-select-width)]">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
          />
          
        <FormField
          name="banned"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is User Banned?</FormLabel>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createUserMutation.isPending} className="w-32">
          {createUserMutation.isPending ? "Submitting..." : "Submit"}
        </Button>      
      </form>
    </Form>        
  );
}
