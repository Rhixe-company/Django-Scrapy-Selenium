import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: images } = await supabase.from("ComicImage").select();
  return NextResponse.json(images);
}
export async function POST(request: Request) {
  const { link } = await request.json();
  const supabase = await createClient();
  const { data: image } = await supabase.from("ComicImage").insert({ link });
  return NextResponse.json(image);
}
