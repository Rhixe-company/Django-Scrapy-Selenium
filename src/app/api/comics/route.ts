import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: comics } = await supabase
    .from("Comic")
    .select()
    .match({ status: "ongoing" });
  return NextResponse.json(comics);
}
// export async function POST(request: Request) {
//   const { title } = await request.json();
//   const supabase = await createClient();
//   const { data: comic } = await supabase.from("Comic").insert({ title });
//   return NextResponse.json(comic);
// }
export async function PUT(request: Request) {
  const { id } = await request.json();
  const { title } = await request.json();
  const supabase = await createClient();
  const { data: comic } = await supabase
    .from("Comic")
    .update({ title })
    .match({ id });
  return NextResponse.json(comic);
}
