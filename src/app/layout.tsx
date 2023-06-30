import Image from "next/image";
import "./globals.css";
import { Urbanist } from "next/font/google";
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
    title: "Atton, express yourself here!",
    description: "Atton is a community-based platform where you can share your thoughts and ideas with the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={urbanist.className}>
                <AuthContext>
                    <ToasterContext />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
