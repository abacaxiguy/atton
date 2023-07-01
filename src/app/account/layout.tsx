import Nav from "@/components/Nav";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav />
            {children}
        </>
    );
}
