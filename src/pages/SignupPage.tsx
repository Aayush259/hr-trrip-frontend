import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import api from "../app/api";
import { getApiErrorMessage, isEmailAddress } from "../app/helpers";
import AuthActionButton from "../components/auth/AuthActionButton";
import AuthCard from "../components/auth/AuthCard";
import AuthField from "../components/auth/AuthField";
import AuthFormError from "../components/auth/AuthFormError";
import AuthPageShell from "../components/auth/AuthPageShell";

type SignupFields = {
    name: string;
    email: string;
    password: string;
};

type SignupErrors = Partial<Record<keyof SignupFields, string>>;

const initialFields: SignupFields = {
    name: "",
    email: "",
    password: "",
};

const validateSignup = ({ email, name, password }: SignupFields) => {
    const nextErrors: SignupErrors = {};
    const trimmedEmail = email.trim();

    if (!name.trim()) {
        nextErrors.name = "Name is required.";
    }

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

const SignupPage = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState(initialFields);
    const [errors, setErrors] = useState<SignupErrors>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name as keyof SignupFields;

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

        const nextErrors = validateSignup(fields);

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        setApiError(null);
        setIsSubmitting(true);

        try {
            await api.post("/api/users/register", {
                email: fields.email.trim(),
                name: fields.name.trim(),
                password: fields.password,
            });
            navigate("/", { replace: true });
        } catch (error) {
            setApiError(getApiErrorMessage(error, "Unable to create your account. Please try again."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthPageShell>
            <AuthCard
                footer={
                    <>
                        Already have an account?{" "}
                        <Link
                            className="font-semibold text-sky-700 transition hover:text-sky-800"
                            to="/login"
                        >
                            Log in
                        </Link>
                    </>
                }
                subtitle="Create your account with a few details."
                title="Get started"
            >
                <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                    <AuthFormError message={apiError} />
                    <AuthField
                        autoComplete="name"
                        disabled={isSubmitting}
                        error={errors.name}
                        icon={FiUser}
                        id="signup-name"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        placeholder="Your name"
                        type="text"
                        value={fields.name}
                    />
                    <AuthField
                        autoComplete="email"
                        disabled={isSubmitting}
                        error={errors.email}
                        icon={FiMail}
                        id="signup-email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        placeholder="you@example.com"
                        type="email"
                        value={fields.email}
                    />
                    <AuthField
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        error={errors.password}
                        icon={FiLock}
                        id="signup-password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Create a password"
                        type="password"
                        value={fields.password}
                    />
                    <AuthActionButton disabled={isSubmitting}>Sign up</AuthActionButton>
                </form>
            </AuthCard>
        </AuthPageShell>
    );
};

export default SignupPage;
