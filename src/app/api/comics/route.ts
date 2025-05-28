import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: comics } = await supabase.from("Comic").select();
  return NextResponse.json(comics);
}
export async function POST(request: Request) {
  const { title } = await request.json();
  const supabase = await createClient();
  const { data: comics } = await supabase.from("Comic").insert({ title });
  return NextResponse.json(comics);
}
export async function PUT(request: Request) {
  const { title } = await request.json();
  const supabase = await createClient();
  const { data: comics } = await supabase.from("Comic").update({ title });
  return NextResponse.json(comics);
}
