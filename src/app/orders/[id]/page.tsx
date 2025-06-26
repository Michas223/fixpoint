import NotFound from "@/components/orders/not-found";
import OrderDetails from "@/components/orders/order-details";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const orderId = (await params).id;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return redirect("/login");

    const formatedOrderId = Number(orderId.replace("0", ""));

    if (!formatedOrderId) return <NotFound />;

    const userId = session.user.id;
    const orderData = await db.order.findFirst({
        where: { userId: userId, id: formatedOrderId },
    });

    if (!orderData) return <NotFound />;

    let isAdmin = false;

    if (session.user.role === "admin") isAdmin = true;

    const orderHistory = await db.orderHistory.findMany({
        where: { orderId: orderData.id },
    });

    return (
        <OrderDetails
            orderData={orderData}
            orderHistory={orderHistory}
            isAdmin={isAdmin}
        />
    );
}
