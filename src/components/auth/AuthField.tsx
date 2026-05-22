import type { ChangeEventHandler } from "react";
import type { IconType } from "react-icons";

type AuthFieldProps = {
    autoComplete: string;
    disabled?: boolean;
    error?: string;
    icon: IconType;
    id: string;
    label: string;
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    type: "email" | "password" | "text";
    value: string;
};

const AuthField = ({
    autoComplete,
    disabled = false,
    error,
    icon: Icon,
    id,
    label,
    name,
    onChange,
    placeholder,
    type,
    value,
}: AuthFieldProps) => {
    const errorId = `${id}-error`;
    const fieldStateClassName = error
        ? "border-rose-300 bg-rose-50 text-rose-400 focus-within:border-rose-400 focus-within:ring-rose-100"
        : "border-slate-200 bg-slate-50 text-slate-400 focus-within:border-sky-400 focus-within:bg-white focus-within:ring-sky-100";

    return (
        <label className="block space-y-2" htmlFor={id}>
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <span
                className={`flex h-12 items-center gap-3 rounded-md border px-3 transition focus-within:ring-4 ${fieldStateClassName}`}
            >
                <Icon aria-hidden="true" className="shrink-0 text-lg" />
                <input
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={Boolean(error)}
                    autoComplete={autoComplete}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                    disabled={disabled}
                    id={id}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                />
            </span>
            {error ? (
                <span className="block text-sm text-rose-600" id={errorId}>
                    {error}
                </span>
            ) : null}
        </label>
    );
};

export default AuthField;
