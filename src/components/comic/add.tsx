"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from 'react';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function AddComic() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title } = Object.fromEntries(new FormData(e.currentTarget));
    await fetch("http://localhost:3000/api/comics", {
      method: "post",
      body: JSON.stringify({ title }),
    });
    router.refresh();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>

          <Label htmlFor="title">Title</Label>
          <Input name="title" placeholder="Tests" required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
