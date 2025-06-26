"use client";

import { JSX } from "react";
import { motion } from "motion/react";

export default function DeleteAccountModal({
    children,
}: {
    children?: string | JSX.Element | JSX.Element[];
}) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-screen w-screen fixed left-1/2 top-1/2 -translate-1/2 flex justify-center items-center bg-black/30 z-10"
            >
                <div className="h-128 w-96 flex flex-col justify-center items-center gap-4 bg-background rounded-md border-border p-4 border-2">
                    {children}
                </div>
            </motion.div>
        </>
    );
}
