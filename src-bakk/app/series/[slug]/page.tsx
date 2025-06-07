import Header from "../../../components/comic/hero";

import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await fetch(`http://localhost:3000/api/comics/${slug}`);
  const item = await response.json();
  if (!item) {
    notFound();
  }

  return (
    <>
      <Header item={item} />
    </>
  );
}
