import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    type?: string;
    label: string;
    register: UseFormRegister<FieldValues>;
}

export default function Input({ id, label, type = "text", register }: InputProps) {
    return (
        <div className="flex flex-col">
            <label className="text-xl text-gray-400" htmlFor={id}>
                {label}
            </label>
            <input
                className="px-4 py-2 text-xl rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                type={type}
                id={id}
                required
                {...register(id, { required: true })}
            />
        </div>
    );
}
