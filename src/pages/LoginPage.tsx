import { Link } from "react-router";
import { FiLock, FiMail } from "react-icons/fi";
import AuthActionButton from "../components/auth/AuthActionButton";
import AuthCard from "../components/auth/AuthCard";
import AuthField from "../components/auth/AuthField";
import AuthPageShell from "../components/auth/AuthPageShell";

const LoginPage = () => {
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
                <form className="space-y-5">
                    <AuthField
                        autoComplete="email"
                        icon={FiMail}
                        id="login-email"
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                    />
                    <AuthField
                        autoComplete="current-password"
                        icon={FiLock}
                        id="login-password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />
                    <AuthActionButton>Log in</AuthActionButton>
                </form>
            </AuthCard>
        </AuthPageShell>
    );
};

export default LoginPage;
