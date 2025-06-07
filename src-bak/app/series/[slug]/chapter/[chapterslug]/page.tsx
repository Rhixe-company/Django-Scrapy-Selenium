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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await fetch(`http://localhost:3000/api/chapters/${slug}`, {
    cache: "no-cache",
  });
  const item = await response.json();
  if (!item) {
    notFound();
  }
  return (
    <>
      <Header item={item} />
    </>
  );
}
