import { AnimalsTable } from "@/entities/animals/components/AnimalsTable";

export default function AnimalsPage() {
  return (
    <div className="flex flex-col items-center h-screen w-full">
      <h1 className="text-2xl font-bold mb-4">Animals</h1>
      <AnimalsTable />
    </div>
  );
}