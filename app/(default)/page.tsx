import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <div className="flex flex-col gap-5 items-center m-4">Home</div>;
};

export default Home;
