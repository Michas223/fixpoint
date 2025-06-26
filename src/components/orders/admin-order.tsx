"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { type OrderStatus } from "@prisma/client";
import { PrintQRCode } from "@/components/qrcode/print-qrcode";

export default function AdminOrder({
    orderId,
    orderStatus,
}: {
    orderId: string;
    orderStatus: OrderStatus;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        bodyClass: "h-screen w-screen flex justify-center items-center",
    });

    const printQRCode = () => {
        reactToPrintFn();
    };

    return (
        <>
            <PrintQRCode orderId={orderId} ref={contentRef} />

            <div className="w-full flex flex-col justify-center items-center gap-4">
                <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    // disabled={
                    //     orderStatus === "PENDING" ||
                    //     orderStatus === "DELIVERY" ||
                    //     orderStatus === "CANCELLED"
                    // }
                    onClick={printQRCode}
                >
                    Wydrukuj kod
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                    Zmień Status
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                    Ustal cene
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                    Ustal date przyjęcia
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                    Ustal oczekiwany czas dostawy
                </Button>
            </div>
        </>
    );
}
