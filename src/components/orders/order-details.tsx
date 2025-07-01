import {
    type OrderHistory as OrderHistoryType,
    type Order as OrderDataType,
} from "@prisma/client";
import OrderStatus from "@/components/orders/order-status";
import OrderData from "@/components/orders/data";
import { Separator } from "@/components/ui/separator";
import OrderHistoryEntry from "@/components/orders/order-history-entry";
import AdminOrder from "@/components/orders/admin-order";
import { format } from "date-fns";

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function OrderDetails({
    orderData,
    orderHistory,
    isAdmin,
}: {
    orderData: OrderDataType;
    orderHistory: OrderHistoryType[];
    isAdmin: boolean;
}) {
    const deliveryMethods = {
        MYSELF: "Osobiście",
        TECH_ARRIVAL: "Dojazd technika",
        DELIVERY: "Kurierem",
    };

    return (
        <>
            <div className="grow-1 w-full relative p-12">
                <div className="container flex flex-col gap-4">
                    {isAdmin && (
                        <AdminOrder
                            orderId={orderData.id.toString().padStart(7, "0")}
                            orderStatus={orderData.currentStatus}
                            orderPrice={orderData.price}
                        />
                    )}
                    <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
                        <div className="w-full lg:w-auto flex flex-col md:flex-row gap-2 justify-between lg:justify-start text-md">
                            <OrderData
                                title="Numer zlecenia"
                                data={orderData.id.toString().padStart(7, "0")}
                            />
                            <div className="w-1">
                                <Separator orientation="vertical" />
                            </div>
                            <OrderData
                                title="Sposób dostarczenia"
                                data={deliveryMethods[orderData.deliveryMethod]}
                            />
                            <div className="w-1">
                                <Separator orientation="vertical" />
                            </div>
                            <OrderData
                                title="Oczekiwany czas zakończenia naprawy"
                                data={
                                    orderData.expectedCompletionDate
                                        ? format(
                                              orderData.expectedCompletionDate,
                                              "Pp"
                                          )
                                        : "Nie określono"
                                }
                            />
                        </div>
                        <OrderStatus status={orderData.currentStatus} />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                        <div className="max-w-auto md:max-w-1/2 flex flex-col">
                            <p className="text-xl font-bold">
                                {capitalizeFirstLetter(orderData.deviceType)} |{" "}
                                {orderData.title}
                            </p>
                            <p className="text-sm text-accent-foreground opacity-80">
                                {orderData.description}
                            </p>
                        </div>
                        <p className="text-xl">
                            Cena:{" "}
                            <span className="font-bold">
                                {orderData.price
                                    ? `${orderData.price} zł`
                                    : "Nie ustalona"}
                            </span>
                        </p>
                    </div>
                    <div className="w-full flex flex-col border-t-2">
                        {orderHistory.map((entry) => (
                            <OrderHistoryEntry
                                key={entry.id}
                                entryData={entry}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
