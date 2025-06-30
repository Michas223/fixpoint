import { db } from "@/lib/prisma";
import { columns, Order } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Order[]> {
    const data = await db.order.findMany({
        select: {
            id: true,
            title: true,
            createdAt: true,
            currentStatus: true, // tymczasowo
            user: {
                select: {
                    email: true,
                },
            },
        },
    });

    const mapped = data.map((order) => ({
        id: order.id.toString(),
        email: order.user.email,
        title: order.title,
        status: order.currentStatus,
        createdAt: order.createdAt,
    }));

    return mapped;
}

export default async function OrdersTable() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
