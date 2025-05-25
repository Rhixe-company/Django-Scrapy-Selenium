import React from "react";
import type { User } from "@/models/users";
export default function Itembar({ user }: { user: User }) {
  return (
    <div>
      <h2>profile {user.email}</h2>
    </div>
  );
}
