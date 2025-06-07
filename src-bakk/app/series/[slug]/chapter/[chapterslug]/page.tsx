import Header from "../../../../../components/chapter/hero";

import { notFound } from "next/navigation";
// export const revalidate = 60; # revalidate

export default async function page({
  params,
}: {
  params: Promise<{ chapterslug: string }>;
}) {
  const { chapterslug } = await params;
  const response = await fetch(
    `http://localhost:3000/api/chapters/${chapterslug}`
  );
  const item = await response.json();
  if (!item) {
    notFound();
  }
  console.log(item);
  return (
    <>
      <Header item={item} />
    </>
  );
}
