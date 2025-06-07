import UpdateComic from "../../../../components/comic/update";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0 ">
        <UpdateComic myslug={slug} />
      </div>
    </>
  );
}
