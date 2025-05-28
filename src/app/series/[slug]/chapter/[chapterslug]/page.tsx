import Header from "@/components/chapter/hero";
import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
// export const revalidate = 60; # revalidate
export const revalidate = 0;
export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: chapters } = await supabase.from("Chapter").select("slug");
  return chapters ?? [];
}

export default async function page({
  params,
}: {
  params: Promise<{ chapterslug: string }>;
}) {
  const { chapterslug: slug } = await params;
  const supabase = await createClient();

  const { data: chapter } = await supabase
    .from("Chapter")
    .select()
    .match({ slug })
    .single();
  if (!chapter) {
    notFound();
  }
  return (
    <>
      <Header item={chapter} />
    </>
  );
}
