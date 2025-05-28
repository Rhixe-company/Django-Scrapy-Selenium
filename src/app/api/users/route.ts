import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: users } = await supabase.auth.getUserIdentities();
  return NextResponse.json(users);
}
