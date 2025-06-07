export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-center h-full md:mt-7">{children}</div>;
}
