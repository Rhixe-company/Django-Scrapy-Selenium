"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { ChapterType } from "../../types/ChapterType";
export default function UpdateChapter({ item }: { item: ChapterType }) {
  const [name, setName] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/chapters", {
      method: "post",
      body: JSON.stringify({ name: name, slug: item.slug }),
    });
    router.refresh();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Tests"
            value={item.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
