import AdminDashboard from "@/components/dashboard/admin-dashboard";
import UserDashboard from "@/components/dashboard/user-dashboard";
import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/prisma";
import type { Order } from "@prisma/client";
import { headers } from "next/headers";

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <div className="mx-auto w-xl p-12">
                <Alert variant="destructive">
                    <Icons.x className="h-4 w-4" />
                    <AlertTitle>Wystąpił błąd!</AlertTitle>
                    <AlertDescription>
                        Wyczyść pliki cookies i odświerz stronę!
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const user = session.user;

    let orders: Order[] = [];

    if (user.role === "user") {
        orders = await db.order.findMany({
            where: {
                userId: user.id,
            },
        });
    }

    return (
        <>
            {user.role === "user" ? (
                <UserDashboard phoneNumber={user.phoneNumber} orders={orders} />
            ) : (
                <AdminDashboard />
            )}
        </>
    );
}
