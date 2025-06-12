import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["female", "male", "other"]),
  banned: z.boolean(),
});

export const createUserSchema = userSchema.omit({ id: true });
export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
