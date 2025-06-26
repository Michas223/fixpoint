import { redirect } from "next/navigation";
import { type Order as OrderDataType } from "@prisma";

export default function Order({
    title,
    id,
    status,
}: {
    title: string;
    id: string;
    status: OrderDataType["currentStatus"];
}) {
    const redirectToDetails = () => {
        redirect(`/orders/${id}`);
    };

    return (
        <>
            <div
                onClick={redirectToDetails}
                className="h-48 w-full flex flex-col justify-center items-center border-border border-1 rounded-md cursor-pointer opacity-70 transition-opacity hover:opacity-100"
            >
                <p
                    data-status={status}
                    className="data-[status=CANCELLED]:line-through text-xl font-bold"
                >
                    {title}
                </p>
                <p className="text-sm text-accent-foreground">
                    Kliknij aby uzyskać więcej informacji
                </p>
            </div>
        </>
    );
}
