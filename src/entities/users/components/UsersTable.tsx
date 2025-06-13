import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/entities/users/api";
import { User } from "@/entities/users/types";

export function UsersTable() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <p className="p">Loading users...</p>;
  if (error) return <p className="p">Error fetching users</p>;
  if (!users || users.length === 0) return <p className="p">No users found.</p>;

  return (
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr>
          <th className="border px-2 py-1">ID</th>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Gender</th>
          <th className="border px-2 py-1">Banned</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <tr key={user.id}>
            <td className="border px-2 py-1">{user.id}</td>
            <td className="border px-2 py-1">{user.name}</td>
            <td className="border px-2 py-1">{user.gender}</td>
            <td className="border px-2 py-1">{user.banned ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}