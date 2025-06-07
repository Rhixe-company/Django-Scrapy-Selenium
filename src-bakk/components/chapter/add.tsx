"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
export default function AddComic() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = Object.fromEntries(new FormData(e.currentTarget));
    await fetch("http://localhost:3000/api/chapters", {
      method: "post",
      body: JSON.stringify({ name }),
    });
    router.refresh();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input name="name" placeholder="Tests" required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
