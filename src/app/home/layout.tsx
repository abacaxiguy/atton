import Nav from "@/components/Nav";

export const metadata = {
    title: "Atton",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav />
            {children}
        </>
    );
}
