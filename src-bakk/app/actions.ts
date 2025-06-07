"use server";

import { encodedRedirect } from "../utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const password_confirmation = formData
    .get("password_confirmation")
    ?.toString();

  const origin = (await headers()).get("origin");

  if (!email || !password || !password_confirmation) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email , password and password_confirmation are required"
    );
  }
  if (password_confirmation != password) {
    return encodedRedirect("error", "/sign-up", "Passwords do not match");
  }

  const body = { email, password };
  const res = await fetch(process.env.PATH_URL_BACKEND + "/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const content = await res.json();
  if (content) {
    console.log(content);
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const body = { email, password };

  const error: any = await fetch(
    process.env.PATH_URL_BACKEND + "/api/users/login/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const signOutAction = async () => {
  return redirect("/sign-in");
};
