import getCurrentUser from "@/actions/getCurrentUser";
import Image from "next/image";

export default async function UserInfo() {
    const user = await getCurrentUser();

    if (!user) return null;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-primary-500 text-2xl">Your info</h1>
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        {user.pfp ? (
                            <Image src={user.pfp} width={50} height={50} alt="avatar" />
                        ) : (
                            <button className="border-primary-500 border-4 flex items-center justify-center text-4xl font-semibold text-primary-500 w-12 h-12 rounded border-dashed">+</button>
                        )}
                        <h1 className="text-primary-500 text-2xl">{user.username}</h1>
                        <p className="text-gray-600 text-lg">{user.email}</p>
                        <div className="flex items-center gap-1">
                            <Image src="/images/nebulae.svg" width={30} height={30} alt="nebulae" />
                            <p className="text-gray-600 text-lg">{user.nebulae}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
