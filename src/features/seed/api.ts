import api from "@/lib/axios";

export const seedDatabase = async (): Promise<void> => {
  await api.post("/seed");
};