import getCurrentUser from "@/actions/getCurrentUser";
import UserInfo from "./components/UserInfo";
import Galaxies from "./components/galaxies/Galaxies";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const currentUser = await getCurrentUser();

    let title = "Atton";

    if (currentUser?.username) title = `${currentUser.username}'s account`;

    return {
        title,
    };
}

export default function Account() {
    return (
        <div className="flex gap-4">
            <UserInfo />
            <Galaxies />
        </div>
    );
}
