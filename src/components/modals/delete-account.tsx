"use client";

import { JSX } from "react";
import { motion } from "motion/react";
import { Icons } from "../icons";
import { Button } from "../ui/button";

export default function DeleteAccountModal({
    setShowModal,
    handleSubmitModal,
}: {
    setShowModal: (status: boolean) => void;
    handleSubmitModal: () => void;
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
                    <Icons.userX className="size-24" />
                    <p className="text-xl font-bold">Usuń konto</p>
                    <p className="text-center text-sm text-accent-foreground">
                        Czy jesteś pewny że chcesz usunąć konto?
                    </p>
                    <Button
                        className="w-full cursor-pointer py-6"
                        variant="outline"
                        onClick={() => setShowModal(false)}
                    >
                        Anuluj usunięcie konta
                    </Button>
                    <Button
                        className="w-full cursor-pointer py-6"
                        variant="destructive"
                        onClick={handleSubmitModal}
                    >
                        Usuń konto
                    </Button>
                </div>
            </motion.div>
        </>
    );
}
