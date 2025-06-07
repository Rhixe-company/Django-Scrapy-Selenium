import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: chapter } = await supabase
    .from("Chapter")
    .select("*")
    .eq("slug", slug)
    .single();

  return NextResponse.json(chapter);
}
