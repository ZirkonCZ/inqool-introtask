import api from "@/lib/axios";
import { Animal } from "./types";
import { CreateAnimalDto, UpdateAnimalDto } from "./schema";

export const getAnimals = async (): Promise<Animal[]> => {
  const res = await api.get("/animals");
  return res.data;
};

export const getAnimalById = async (id: string): Promise<Animal> => {
  const res = await api.get(`/animals/${id}`);
  return res.data;
};

export const createAnimal = async (data: CreateAnimalDto): Promise<Animal> => {
  const res = await api.post("/animals", data);
  return res.data;
};

export const updateAnimal = async (id: string, data: UpdateAnimalDto): Promise<Animal> => {
  const res = await api.patch(`/animals/${id}`, data);
  return res.data;
};

export const deleteAnimal = async (id: string): Promise<void> => {
  await api.delete(`/animals/${id}`);
};
