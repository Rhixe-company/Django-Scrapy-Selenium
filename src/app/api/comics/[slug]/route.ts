import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: comic } = await supabase
    .from("Comic")
    .select("*")
    .eq("slug", slug)
    .single();

  return NextResponse.json(comic);
}
