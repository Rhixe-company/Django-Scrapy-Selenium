import Itembar from "@/app/components/profile/Itembar";

import fetchUser from "@/lib/user/fetchUser";
import type { User } from "@/models/users";
export default async function Profile(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const url = `http://localhost:8000/api/users/${params.id}/`;
  const user: User | undefined = await fetchUser(url);
  if (!user)
    return (
      <h2 className="m-4 text-2xl font-bold">User {params.id} not Found</h2>
    );
  return (
    <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
      <Itembar user={user} />
    </div>
  );
}
