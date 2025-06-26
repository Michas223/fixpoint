"use client";

import { type OrderStatus as OrderStatusType } from "@prisma/client";
import { cn } from "@/lib/utils";

const orderStatus = {
    PENDING: "Oczekujące",
    DELIVERY: "Dostawa",
    DIAGNOZE: "Diagnoza",
    WAITING_FOR_PARTS: "Oczekiwanie na części",
    IN_PROGRESS: "W trakcie",
    COMPLETED: "Zakończone",
    CANCELLED: "Anulowane",
};

export default function OrderStatus({
    status,
    className,
}: {
    status: OrderStatusType;
    className?: string;
}) {
    const colors = {
        PENDING: "bg-pending",
        DELIVERY: "bg-delivery",
        DIAGNOZE: "bg-diagnoze",
        WAITING_FOR_PARTS: "bg-waiting-for-parts",
        IN_PROGRESS: "bg-in-progress",
        COMPLETED: "bg-completed",
        CANCELLED: "bg-canceled",
    };

    return (
        <>
            <div
                className={cn(
                    `lg:w-48 flex justify-center items-center font-semibold tracking-wide text-xs uppercase rounded-sm py-1 text-white ${colors[status]}`,
                    className
                )}
            >
                {orderStatus[status]}
            </div>
        </>
    );
}
