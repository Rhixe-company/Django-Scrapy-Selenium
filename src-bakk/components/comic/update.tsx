"use client";
import { fetcher } from "../../app/libs";
import MyError from "../MyError";
import Spinner from "../Spinner";
import { SubmitButton } from "../submit-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Option } from "../ui/option";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
export default function UpdateComic({ myslug }: { myslug: string }) {
  const {
    data: comic,
    isLoading,
    error,
  } = useSWR(`/api/comics/${myslug}`, fetcher);
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [updated_at, setUpdated_at] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [serialization, setSerialization] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [numimages, setNumimages] = useState<number>(0);
  const [numchapters, setNumchapters] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    if (comic) {
      setTitle(comic.title);
      setSlug(comic.slug);
      setDescription(comic.description);
      setStatus(comic.status);
      setUpdated_at(comic.updated_at);
      setLink(comic.link);
      setSerialization(comic.serialization);
      setRating(comic.rating);
      setNumimages(comic.numimages);
      setNumchapters(comic.numchapters);
    }
  }, [comic, isLoading]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      title != "" &&
      slug != "" &&
      description != "" &&
      status != "" &&
      updated_at != "" &&
      link != "" &&
      rating != ""
    ) {
      const formData = {
        title: title,
        slug: slug,
        description: description,
        status: status,
        updated_at: updated_at,
        link: link,
        rating: rating,
        numimages: numimages,
        numchapters: numchapters,
        serialization: serialization,
      };
      const res = await fetch(`/api/comics/${myslug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const content = await res.json();
      if (content.success > 0) {
        router.push("/comics");
      }
    }
  };
  if (error) return <MyError />;
  if (isLoading) return <Spinner />;
  if (!comic) return null;
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <div className="mb-3">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              required
              value={title}
              onChange={(e: any) => {
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
              onChange={(e: any) => {
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
              onChange={(e: any) => {
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
              onChange={(e: any) => {
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
              onChange={(e: any) => {
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
              onChange={(e: any) => {
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
              onChange={(e: any) => {
                setUpdated_at(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={status}
              onChange={(e: any) => {
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
              onChange={(e: any) => {
                setLink(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="serialization">Serialization</Label>
            <Input
              name="serialization"
              value={serialization}
              onChange={(e: any) => {
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
