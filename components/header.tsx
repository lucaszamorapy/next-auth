"use server";
import { auth } from "@/app/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import LogoutForm from "./logout-form";

export const Header = async () => {
  const session = await auth();
  console.log(session);
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:opacity-80 transition"
        >
          Glowes
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Sobre
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Produtos
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Contato
          </Link>
          {session && session.user && (
            <div className="flex items-center gap-5">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={session.user.image ?? undefined}
                />
                <AvatarFallback>
                  {session.user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <LogoutForm />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
