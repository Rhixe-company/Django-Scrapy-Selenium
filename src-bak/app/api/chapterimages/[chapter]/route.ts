import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ chapter: string }> }
) {
  const { chapter } = await params;
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("ChapterImage")
    .select()
    .eq("chapter", chapter);

  return NextResponse.json(images);
}
