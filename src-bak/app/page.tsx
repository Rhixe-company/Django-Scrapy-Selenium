import Leftbar from "@/components/base/Leftbar";
import Rightbar from "@/components/base/Rightbar";
export const revalidate = 30;
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Rhixe Scans",
  description: "Read Comics",
};

export default async function Home() {
  return (
    <>
      <Leftbar />
      <Rightbar />
    </>
  );
}
