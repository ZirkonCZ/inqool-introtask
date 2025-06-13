import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserSchema, UpdateUserDto } from "../schema";
import { useUpdateUser } from "../hooks";
import { User } from "@/entities/users/types";
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

export function EditUserForm({
  user,
  onSuccess,
}: {
  user: User;
  onSuccess?: () => void;
}) {
  
  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
  });
  
  const updateUserMutation = useUpdateUser();

  function onSubmit(data: UpdateUserDto) {
    updateUserMutation.mutate({id: user.id, data}, { 
      onSuccess: () => {
        form.reset();
        toast("User updated!", {
          action: {
          label: "Close",
          onClick: () => console.log("Close"),
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
                <Input defaultValue={user.name} placeholder={user.name} {...field} />
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
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={user.gender} defaultValue={user.gender} />
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
                defaultChecked={user.banned}
              />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateUserMutation.isPending} className="w-32">
          {updateUserMutation.isPending ? "Submitting..." : "Submit"}
        </Button>      
      </form>
    </Form>        
  );
}
