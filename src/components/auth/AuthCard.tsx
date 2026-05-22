import type { PropsWithChildren, ReactNode } from "react";

type AuthCardProps = PropsWithChildren<{
    title: string;
    subtitle: string;
    footer: ReactNode;
}>;

const AuthCard = ({ children, footer, subtitle, title }: AuthCardProps) => {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] sm:p-8">
            <header className="mb-7 space-y-2">
                <h1 className="text-2xl font-semibold tracking-[0] text-slate-950">
                    {title}
                </h1>
                <p className="text-sm leading-6 text-slate-500">{subtitle}</p>
            </header>

            {children}

            <footer className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
                {footer}
            </footer>
        </div>
    );
};

export default AuthCard;
