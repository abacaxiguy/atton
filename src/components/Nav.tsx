"use client";

import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LuPlusSquare, LuUser } from "react-icons/lu";

export default function Nav() {
    return (
        <nav>
            <ul className="flex gap-2">
                <li>
                    <button onClick={() => signOut()}>
                        <HiArrowLeftOnRectangle size={26} />
                    </button>
                </li>
                <li>
                    <Link href="/account">
                        <LuUser size={26} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
