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
            <body className={urbanist.className}>{children}</body>
        </html>
    );
}
