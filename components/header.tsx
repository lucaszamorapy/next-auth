"use client";
import Link from "next/link";

export const Header = () => {
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
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
};
