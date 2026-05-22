import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { FiLock, FiMail } from "react-icons/fi";
import api from "../app/api";
import { getApiErrorMessage, isEmailAddress } from "../app/helpers";
import AuthActionButton from "../components/auth/AuthActionButton";
import AuthCard from "../components/auth/AuthCard";
import AuthField from "../components/auth/AuthField";
import AuthFormError from "../components/auth/AuthFormError";
import AuthPageShell from "../components/auth/AuthPageShell";

type LoginFields = {
    email: string;
    password: string;
};

type LoginErrors = Partial<Record<keyof LoginFields, string>>;

const initialFields: LoginFields = {
    email: "",
    password: "",
};

const validateLogin = ({ email, password }: LoginFields) => {
    const nextErrors: LoginErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
        nextErrors.email = "Email is required.";
    } else if (!isEmailAddress(trimmedEmail)) {
        nextErrors.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
        nextErrors.password = "Password is required.";
    }

    return nextErrors;
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState(initialFields);
    const [errors, setErrors] = useState<LoginErrors>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name as keyof LoginFields;

        setFields((currentFields) => ({
            ...currentFields,
            [fieldName]: event.target.value,
        }));
        setErrors((currentErrors) => ({
            ...currentErrors,
            [fieldName]: undefined,
        }));
        setApiError(null);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validateLogin(fields);

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        setApiError(null);
        setIsSubmitting(true);

        try {
            await api.post("/api/users/login", {
                email: fields.email.trim(),
                password: fields.password,
            });
            navigate("/", { replace: true });
        } catch (error) {
            setApiError(getApiErrorMessage(error, "Unable to log in. Please try again."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthPageShell>
            <AuthCard
                footer={
                    <>
                        New here?{" "}
                        <Link
                            className="font-semibold text-sky-700 transition hover:text-sky-800"
                            to="/signup"
                        >
                            Create an account
                        </Link>
                    </>
                }
                subtitle="Sign in with your email and password."
                title="Welcome back"
            >
                <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                    <AuthFormError message={apiError} />
                    <AuthField
                        autoComplete="email"
                        disabled={isSubmitting}
                        error={errors.email}
                        icon={FiMail}
                        id="login-email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        placeholder="you@example.com"
                        type="email"
                        value={fields.email}
                    />
                    <AuthField
                        autoComplete="current-password"
                        disabled={isSubmitting}
                        error={errors.password}
                        icon={FiLock}
                        id="login-password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter your password"
                        type="password"
                        value={fields.password}
                    />
                    <AuthActionButton disabled={isSubmitting}>Log in</AuthActionButton>
                </form>
            </AuthCard>
        </AuthPageShell>
    );
};

export default LoginPage;
