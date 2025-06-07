"use client";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Option } from "@/components/ui/option";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ComicType } from "@/types/ComicType";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function UpdateComic({ item }: { item: ComicType }) {
  const [title, setTitle] = useState(item.title);
  const [slug, setSlug] = useState(item.slug);
  const [description, setDescription] = useState(item.description);
  const [status, setStatus] = useState(item.status);
  const [updated_at, setUpdated_at] = useState(item.updated_at);
  const [link, setLink] = useState(item.link);
  const [serialization, setSerialization] = useState(item.serialization);
  const [rating, setRating] = useState(item.rating);
  const [numimages, setNumimages] = useState(item.numimages);
  const [numchapters, setNumchapters] = useState(item.numchapters);
  const router = useRouter();
  const handleSubmit = async () => {
    // e.preventDefault();

    const supabase = await createClient();
    await supabase
      .from("Comic")
      .update({
        title,
        slug,
        description,
        rating,
        status,
        numimages,
        numchapters,
        updated_at,
        link,
        serialization,
      })
      .match({ slug });
    router.push("/comics");
  };
  return (
    <div>
      <form action={handleSubmit} className="space-y-3">
        <div>
          <div className="mb-3">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="slug">Slug</Label>
            <Input
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="rating">Rating</Label>
            <Input
              name="rating"
              type="number"
              required
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="numimages">Numimages</Label>
            <Input
              name="numimages"
              type="number"
              required
              value={numimages}
              onChange={(e) => {
                setNumimages(Number(e.target.value));
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="numchapters">Numchapters</Label>
            <Input
              name="numchapters"
              type="number"
              required
              value={numchapters}
              onChange={(e) => {
                setNumchapters(Number(e.target.value));
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="updated_at">Updated_at</Label>
            <Input
              name="updated_at"
              type="date"
              required
              value={updated_at}
              onChange={(e) => {
                setUpdated_at(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <Option value="ongoing">Ongoing</Option>
              <Option value="completed">Completed</Option>
              <Option value="hiatus">Hiatus</Option>
              <Option value="dropped">Dropped</Option>
              <Option value="season end">Season end</Option>
              <Option value="coming soon">Coming soon</Option>
            </Select>
          </div>
          <div className="mb-3">
            <Label htmlFor="link">Link</Label>
            <Input
              name="link"
              required
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="serialization">Serialization</Label>
            <Input
              name="serialization"
              value={serialization}
              onChange={(e) => {
                setSerialization(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="p-3 mb-3">
          <SubmitButton>Update Comic</SubmitButton>
        </div>
      </form>
    </div>
  );
}
