import { auth } from "@/app/auth";
import LogoutForm from "@/components/logout-form";
import Image from "next/image";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <div className="flex flex-col gap-5 items-center m-4">
      <h1>{session?.user.name}</h1>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt={session.user.name ?? "Avatar do usuário"}
          width={72}
          height={72}
          className="rounded-full"
        />
      )}
      <LogoutForm />
    </div>
  );
};

export default Home;
