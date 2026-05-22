import type { PropsWithChildren } from "react";

const AuthPageShell = ({ children }: PropsWithChildren) => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10 text-slate-950">
            <section className="w-full max-w-md">{children}</section>
        </main>
    );
};

export default AuthPageShell;
