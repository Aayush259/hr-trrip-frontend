import { FiArrowRight } from "react-icons/fi";

type AuthActionButtonProps = {
    children: string;
    disabled?: boolean;
};

const AuthActionButton = ({ children, disabled = false }: AuthActionButtonProps) => {
    return (
        <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={disabled}
            type="submit"
        >
            <span>{children}</span>
            <FiArrowRight aria-hidden="true" className="text-base" />
        </button>
    );
};

export default AuthActionButton;
