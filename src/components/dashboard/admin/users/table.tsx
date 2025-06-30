import { db } from "@/lib/prisma";
import { columns, User } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
    const data = await db.user.findMany({
        select: {
            id: true,
            email: true,
            phoneNumber: true,
            createdAt: true,
        },
    });

    return data;
}

export default async function UsersTable() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
