import Image from "next/image";
import "./globals.css";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
    title: "Atton, express yourself here!",
    description: "Atton is a community-based platform where you can share your thoughts and ideas with the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={urbanist.className}>
                <main className="flex min-h-screen overflow-hidden">
                    <div className="flex-1 relative">
                        <div className="w-full h-full bg-primary-500 opacity-[0.15] absolute top-0 left-0 z-10" />
                        <Image src="/images/home-hero.jpg" alt="Milky way by Miriam Espacio" className="object-right object-cover w-full h-full" width={1920} height={1079} quality={100} />
                    </div>
                    {children}
                </main>
            </body>
        </html>
    );
}
