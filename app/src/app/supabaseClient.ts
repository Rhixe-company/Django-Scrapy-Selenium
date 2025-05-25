import { createServerClient, createBrowserClient } from "@supabase/ssr";
import { type NextRequest } from "next/server";

export const createSupabaseServerClient = (request: NextRequest) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { request }
  );
};

export const createSupabaseBrowserClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
