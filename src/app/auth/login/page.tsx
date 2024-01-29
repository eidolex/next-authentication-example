"use client";

import { useAuthContext } from "@/providers/AuthProvider";
import getUser from "@/utils/getUser";
import request from "@/utils/request";
import React from "react";

export default function LoginPage() {
  const { user, setUser } = useAuthContext();

  async function handleLogin() {
    await request("/sanctum/csrf-cookie");

    const response = await request("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password",
      }),
    });

    const data = await getUser(false)
    setUser(data);
  }

  

  return (
    <div>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
}
