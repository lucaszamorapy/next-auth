import { HttpErrorClient } from "@/app/class/client/http-message";
import { Users } from "@/generated/prisma/client";
import { apiFetch } from "@/lib/api";

const UsersPage = async () => {
  let users: Users[] = [];
  let errorMessage: string | null = null;
  try {
    const res = await apiFetch("users", true, "GET");
    users = res.data;
  } catch (error) {
    if (error instanceof HttpErrorClient) {
      errorMessage = error.message;
    }
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ul>
        {users &&
          users.length > 0 &&
          users.map((u) => (
            <li className="flex items-center gap-2" key={u.id}>
              <span>{u.name}</span>
              <span>{u.email}</span>
            </li>
          ))}
      </ul>
      <span>{errorMessage}</span>
    </div>
  );
};

export default UsersPage;
