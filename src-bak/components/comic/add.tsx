import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Option } from "@/components/ui/option";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export default function AddComic() {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const {
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
    } = Object.fromEntries(formData.entries());
    const supabase = await createClient();
    await supabase.from("Comic").insert({
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
    });
    revalidatePath("/comics/add");
  };
  return (
    <div>
      <form action={handleSubmit} className="space-y-3">
        <div>
          <div className="mb-3">
            <Label htmlFor="title">Title</Label>
            <Input name="title" required />
          </div>
          <div className="mb-3">
            <Label htmlFor="slug">Slug</Label>
            <Input name="slug" required />
          </div>
          <div className="mb-3">
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" required />
          </div>
          <div className="mb-3">
            <Label htmlFor="rating">Rating</Label>
            <Input name="rating" type="number" required />
          </div>
          <div className="mb-3">
            <Label htmlFor="numimages">Numimages</Label>
            <Input name="numimages" type="number" required />
          </div>
          <div className="mb-3">
            <Label htmlFor="numchapters">Numchapters</Label>
            <Input name="numchapters" type="number" required />
          </div>
          <div className="mb-3">
            <Label htmlFor="updated_at">Updated_at</Label>
            <Input name="updated_at" type="date" required />
          </div>
          <div className="mb-3">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="ongoing">
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
            <Input name="link" required />
          </div>
          <div className="mb-3">
            <Label htmlFor="serialization">Serialization</Label>
            <Input name="serialization" />
          </div>
        </div>
        <div className="p-3 mb-3">
          <SubmitButton>Add New Comic</SubmitButton>
        </div>
      </form>
    </div>
  );
}
