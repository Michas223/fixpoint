"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { type OrderStatus } from "@prisma/client";
import { PrintQRCode } from "@/components/qrcode/print-qrcode";
import ChangeStatusModal from "@/components/modals/change-status";
import { AnimatePresence } from "motion/react";
import SetPriceModal from "@/components/modals/set-price";
import SetArrivedAtModal from "../modals/set-arrived";
import SetCompletionDateModal from "../modals/set-completion-date";

export default function AdminOrder({
    orderId,
    orderStatus,
    orderPrice,
}: {
    orderId: string;
    orderStatus: OrderStatus;
    orderPrice: number | null;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        bodyClass: "h-screen w-screen flex justify-center items-center",
    });

    const [showChangeStatusModal, setShowChangeStatusModal] =
        useState<boolean>(false);
    const [showSetPriceModal, setShowSetPriceModal] = useState<boolean>(false);
    const [showSetArrivedAtModal, setShowSetArrivedAtModal] =
        useState<boolean>(false);
    const [showSetCompletionDateModal, setShowSetCompletionDate] =
        useState<boolean>(false);

    const printQRCode = () => {
        reactToPrintFn();
    };

    return (
        <>
            <PrintQRCode orderId={orderId} ref={contentRef} />
            <AnimatePresence>
                {showChangeStatusModal && (
                    <ChangeStatusModal
                        orderId={orderId}
                        currentStatus={orderStatus}
                        setShow={setShowChangeStatusModal}
                    />
                )}
                {showSetPriceModal && (
                    <SetPriceModal
                        orderId={orderId}
                        currentPrice={orderPrice}
                        setShow={setShowSetPriceModal}
                    />
                )}
                {showSetCompletionDateModal && (
                    <SetCompletionDateModal
                        orderId={orderId}
                        setShow={setShowSetCompletionDate}
                    />
                )}
            </AnimatePresence>

            <div className="w-full flex flex-col justify-center items-center gap-4">
                <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    disabled={
                        orderStatus === "PENDING" ||
                        orderStatus === "DELIVERY" ||
                        orderStatus === "CANCELLED"
                    }
                    onClick={printQRCode}
                >
                    Wydrukuj kod
                </Button>
                <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => setShowChangeStatusModal(true)}
                >
                    Zmień Status
                </Button>
                <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => setShowSetPriceModal(true)}
                >
                    Ustal cene
                </Button>
                <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => setShowSetArrivedAtModal(true)}
                >
                    Ustal date przyjęcia
                </Button>
                <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => setShowSetCompletionDate(true)}
                >
                    Ustal czas zakończenia naprawy
                </Button>
            </div>
        </>
    );
}
