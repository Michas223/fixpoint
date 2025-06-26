import { type OrderHistory } from "@prisma/client";
import OrderStatus from "./order-status";

export default function OrderHistoryEntry({
    entryData,
}: {
    entryData: OrderHistory;
}) {
    const formatDate = (date: Date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <>
            <div className="w-full flex flex-col gap-4 border-b-2 last:border-none border-dotted py-4">
                <div className="flex gap-2">
                    <OrderStatus status={entryData.status} className="w-48" />
                    <p>{formatDate(entryData.createdAt)}</p>
                </div>
                <ul className="list-disc list-inside">
                    <li>{entryData.message}</li>
                </ul>
            </div>
        </>
    );
}
