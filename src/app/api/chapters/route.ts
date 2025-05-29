import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: chapters } = await supabase.from("Chapter").select();
  return NextResponse.json(chapters);
}
export async function POST(request: Request) {
  const { name } = await request.json();
  const supabase = await createClient();
  const { data: chapter } = await supabase.from("Chapter").insert({ name });
  return NextResponse.json(chapter);
}
