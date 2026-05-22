import { FiUploadCloud } from "react-icons/fi";

const PageFileDropOverlay = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 p-6">
            <section className="w-full max-w-xl rounded-lg border-2 border-dashed border-sky-300 bg-white/95 px-6 py-14 text-center shadow-[0_24px_70px_-24px_rgba(15,23,42,0.4)] backdrop-blur-sm">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-sky-50 text-2xl text-sky-700">
                    <FiUploadCloud aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-lg font-semibold tracking-[0] text-slate-950">
                    Drop travel document
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Image or PDF, maximum file size 2MB.
                </p>
            </section>
        </div>
    );
};

export default PageFileDropOverlay;
