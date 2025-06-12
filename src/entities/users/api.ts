import api from "@/lib/axios";
import { User } from "./types";
import { CreateUserDto, UpdateUserDto } from "./schema";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const res = await api.post("/users", data);
  return res.data;
};

export const updateUser = async (id: string, data: UpdateUserDto): Promise<User> => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
