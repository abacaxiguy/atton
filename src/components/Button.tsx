interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    size: string;
    primary?: boolean;
    secondary?: boolean;
}

export default function Button({ children, size, primary, secondary, type = "button" }: ButtonProps) {
    return (
        <button type={type} className={`${primary ? "bg-primary-500" : ""}${secondary ? "bg-gray-300 text-gray-500" : ""} w-full hover:brightness-90 transition ${size} rounded-full text-white`}>
            {children}
        </button>
    );
}
