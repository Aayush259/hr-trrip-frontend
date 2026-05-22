import { FiAlertCircle } from "react-icons/fi";

type AuthFormErrorProps = {
    message: string | null;
};

const AuthFormError = ({ message }: AuthFormErrorProps) => {
    if (!message) {
        return null;
    }

    return (
        <div
            className="flex gap-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-3 text-sm leading-5 text-rose-700"
            role="alert"
        >
            <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0 text-base" />
            <span>{message}</span>
        </div>
    );
};

export default AuthFormError;
