import Header from "@/components/comic/hero";
import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
// export const revalidate = 60; # revalidate
export const revalidate = 0;
export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: comics } = await supabase.from("Comic").select("slug");
  return comics ?? [];
}

export default async function page({
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
      <Header item={comic} />
    </>
  );
}
