"use client";

import type { Order as OrderType } from "@prisma/client";
import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Order from "@/components/dashboard/user/order";
import CreateOrderModal from "@/components/modals/create-order";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export default function UserDashboard({
    phoneNumber,
    orders,
}: {
    phoneNumber?: string | null | undefined;
    orders: OrderType[];
}) {
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    return (
        <>
            <AnimatePresence>
                {showCreateModal && (
                    <CreateOrderModal setShow={setShowCreateModal} />
                )}
            </AnimatePresence>
            <div className="grow-1 w-full relative p-12">
                <div className="container flex flex-col gap-8">
                    {!phoneNumber && (
                        <Alert variant="destructive">
                            <Icons.x className="h-4 w-4" />
                            <AlertTitle>Nieprawidłowe dane!</AlertTitle>
                            <AlertDescription>
                                Wejdź w ustawienia konta i wypełnij swój numer
                                telefonu!
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button
                        className="w-full cursor-pointer py-6"
                        variant="outline"
                        disabled={!phoneNumber}
                        onClick={() => setShowCreateModal(true)}
                    >
                        Zleć naprawę
                    </Button>
                    <div className="w-full flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">Twoje naprawy:</h1>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap gap-4">
                            {orders.map((order) => (
                                <Order
                                    key={order.id}
                                    status={order.currentStatus}
                                    title={order.title}
                                    id={order.id.toString().padStart(7, "0")}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
