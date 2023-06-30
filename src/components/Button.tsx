interface ButtonProps {
    text: string;
    size: string;
    primary?: boolean;
    secondary?: boolean;
}

export default function Button({ text, size, primary, secondary }: ButtonProps) {
    return (
        <button className={`${primary ? "bg-primary-500" : ""}${secondary ? "bg-gray-300 text-gray-500" : ""} w-full hover:brightness-90 transition ${size} rounded-full text-white`}>{text}</button>
    );
}
