import { useId, useState, type ChangeEvent } from "react";
import { FiUploadCloud } from "react-icons/fi";
import useTravelDocumentUpload from "../../app/hooks/useTravelDocumentUpload";

const HomeFileUpload = () => {
    const inputId = useId();
    const [error, setError] = useState<string | null>(null);
    const uploadTravelDocument = useTravelDocumentUpload();

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            setError(null);
            return;
        }

        setError(await uploadTravelDocument(file));
        event.target.value = "";
    };

    return (
        <section className="w-full max-w-[26rem]">
            <label
                className="flex cursor-pointer flex-col items-center rounded-lg border border-slate-200 bg-white px-6 py-8 text-center shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] transition hover:border-sky-300 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100"
                htmlFor={inputId}
            >
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-50 text-xl text-slate-700">
                    <FiUploadCloud aria-hidden="true" />
                </span>
                <span className="mt-5 text-base font-semibold text-slate-950">
                    Upload image or PDF
                </span>
                <span className="mt-1 text-sm text-slate-500">Maximum file size 2MB</span>
                <span className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Choose file
                </span>
                <input
                    accept="image/*,application/pdf"
                    hidden
                    id={inputId}
                    onChange={handleChange}
                    type="file"
                />
            </label>

            {error ? (
                <p className="mt-3 text-center text-sm font-medium text-rose-600" role="alert">
                    {error}
                </p>
            ) : null}
        </section>
    );
};

export default HomeFileUpload;
