import { z } from "zod/v4";

export const animalSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["cat", "dog", "other"]),
  age: z.int().min(0, "Age must be a positive number"),
});

export const createAnimalSchema = animalSchema.omit({ id: true });
export const updateAnimalSchema = createAnimalSchema.partial();

export type CreateAnimalDto = z.infer<typeof createAnimalSchema>;
export type UpdateAnimalDto = z.infer<typeof updateAnimalSchema>;
