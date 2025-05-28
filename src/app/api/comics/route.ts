import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: comics } = await supabase.from("Comic").select();
  return NextResponse.json(comics);
}
