import type { IconType } from "react-icons";

type AuthFieldProps = {
    autoComplete: string;
    icon: IconType;
    id: string;
    label: string;
    placeholder: string;
    type: "email" | "password" | "text";
};

const AuthField = ({
    autoComplete,
    icon: Icon,
    id,
    label,
    placeholder,
    type,
}: AuthFieldProps) => {
    return (
        <label className="block space-y-2" htmlFor={id}>
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <span className="flex h-12 items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 text-slate-400 transition focus-within:border-sky-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100">
                <Icon aria-hidden="true" className="shrink-0 text-lg" />
                <input
                    autoComplete={autoComplete}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                    id={id}
                    placeholder={placeholder}
                    type={type}
                />
            </span>
        </label>
    );
};

export default AuthField;
