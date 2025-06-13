import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "./api";
import { CreateAnimalDto, UpdateAnimalDto } from "./schema";

export const useAnimals = () => {
  return useQuery({ queryKey: ["animals"], queryFn: getAnimals });
};

export const useAnimal = (id: string) => {
  return useQuery({ queryKey: ["animals", id], queryFn: () => getAnimalById(id) });
};

export const useCreateAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
    },
  });
};

export const useUpdateAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnimalDto }) =>
      updateAnimal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
    },
  });
};

export const useDeleteAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
    },
  });
};
