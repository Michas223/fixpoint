"use client";

import React from "react";
import QRCode from "react-qr-code";

export const PrintQRCode = React.forwardRef<
    HTMLDivElement,
    { orderId: string }
>(({ orderId }, ref) => {
    return (
        <div
            ref={ref}
            className="hidden print:flex flex-col gap-4 justify-center items-center h-screen"
        >
            <QRCode
                className="size-96 aspect-square outline-border outline-4"
                value={orderId}
            />
            <p className="text-2xl font-bold">{orderId}</p>
        </div>
    );
});
