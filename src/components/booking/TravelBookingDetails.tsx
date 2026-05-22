import type { ReactNode } from "react";

type TravelBookingDetailsProps = {
    data: unknown;
};

const formatLabel = (label: string) => {
    return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/^./, (character) => character.toUpperCase());
};

const renderDataValue = (value: unknown, keyPath: string): ReactNode => {
    if (value === null || value === undefined || value === "") {
        return <span className="text-slate-400">Not provided</span>;
    }

    if (Array.isArray(value)) {
        if (!value.length) {
            return <span className="text-slate-400">No items</span>;
        }

        return (
            <div className="space-y-2">
                {value.map((item, index) => (
                    <div
                        className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3"
                        key={`${keyPath}-${index}`}
                    >
                        {renderDataValue(item, `${keyPath}-${index}`)}
                    </div>
                ))}
            </div>
        );
    }

    if (typeof value === "object") {
        const entries = Object.entries(value as Record<string, unknown>);

        if (!entries.length) {
            return <span className="text-slate-400">No details</span>;
        }

        return (
            <dl className="space-y-3">
                {entries.map(([entryLabel, entryValue]) => (
                    <div className="rounded-md border border-slate-200 bg-white px-3 py-3" key={entryLabel}>
                        <dt className="text-xs font-semibold uppercase tracking-[0] text-slate-500">
                            {formatLabel(entryLabel)}
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-slate-800">
                            {renderDataValue(entryValue, `${keyPath}-${entryLabel}`)}
                        </dd>
                    </div>
                ))}
            </dl>
        );
    }

    return <span className="break-words">{String(value)}</span>;
};

const TravelBookingDetails = ({ data }: TravelBookingDetailsProps) => {
    return (
        <div className="rounded-lg bg-slate-50 p-3 sm:p-4">
            {renderDataValue(data, "booking")}
        </div>
    );
};

export default TravelBookingDetails;
