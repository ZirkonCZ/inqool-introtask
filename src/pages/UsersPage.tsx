import { UsersTable } from "@/entities/users/components/UsersTable";

export default function UsersPage() {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UsersTable />
    </div>
  );
}