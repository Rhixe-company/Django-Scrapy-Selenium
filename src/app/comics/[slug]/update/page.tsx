import UpdateComic from "@/components/comic/update";
import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: comic } = await supabase
    .from("Comic")
    .select()
    .match({ slug })
    .single();
  if (!comic) {
    notFound();
  }
  return (
    <>
      <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0 ">
        <UpdateComic item={comic} />
      </div>
    </>
  );
}
