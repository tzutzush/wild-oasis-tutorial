import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Guest() {
  const session = await auth();

  return (
    <li>
      {session?.user?.image ? (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors flex items-center gap-4"
        >
          <Image
            width="34"
            height="34"
            src={session.user.image}
            alt={session.user.name || "Guest"}
            className="h-8 rounded-full"
            referrerPolicy="no-referrer"
          />
          <span>Guest area</span>
        </Link>
      ) : (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors"
        >
          Guest area
        </Link>
      )}
    </li>
  );
}
