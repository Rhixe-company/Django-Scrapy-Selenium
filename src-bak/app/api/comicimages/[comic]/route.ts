import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ comic: string }> }
) {
  const { comic } = await params;
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("ComicImage")
    .select()
    .eq("comic", comic);

  return NextResponse.json(images);
}
