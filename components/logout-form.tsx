"use client";

import { doLogout } from "@/app/actions";
import { Button } from "./ui/button";

const LogoutForm = () => {
  return (
    <div>
      <Button onClick={doLogout}>Sair</Button>
    </div>
  );
};

export default LogoutForm;
