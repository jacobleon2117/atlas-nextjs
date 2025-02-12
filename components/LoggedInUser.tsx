'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoggedInUser() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-2 p-2">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name || "User avatar"}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      )}
      <span className="text-sm font-medium">{session.user.name}</span>
    </div>
  );
}