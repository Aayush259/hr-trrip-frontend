import { Link } from "react-router";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import AuthActionButton from "../components/auth/AuthActionButton";
import AuthCard from "../components/auth/AuthCard";
import AuthField from "../components/auth/AuthField";
import AuthPageShell from "../components/auth/AuthPageShell";

const SignupPage = () => {
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
                <form className="space-y-5">
                    <AuthField
                        autoComplete="name"
                        icon={FiUser}
                        id="signup-name"
                        label="Name"
                        placeholder="Your name"
                        type="text"
                    />
                    <AuthField
                        autoComplete="email"
                        icon={FiMail}
                        id="signup-email"
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                    />
                    <AuthField
                        autoComplete="new-password"
                        icon={FiLock}
                        id="signup-password"
                        label="Password"
                        placeholder="Create a password"
                        type="password"
                    />
                    <AuthActionButton>Sign up</AuthActionButton>
                </form>
            </AuthCard>
        </AuthPageShell>
    );
};

export default SignupPage;
