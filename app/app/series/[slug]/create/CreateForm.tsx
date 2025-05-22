"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const newComic = {
      title,
      description,
      status,
      user_email: "mario@netninja.dev",
    };

    const res = await fetch("http://127.0.0.1:8000/api/comics/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComic),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/comics");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
      <label>
        <span>Status:</span>
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="hiatus">Hiatus</option>
          <option value="dropped">Dropped</option>
          <option value="season end">Season End</option>
          <option value="coming soon">Coming Soon</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Comic</span>}
      </button>
    </form>
  );
}
