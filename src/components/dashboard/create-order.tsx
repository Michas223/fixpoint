"use client";

import { AnimatePresence } from "motion/react";
import CreateOrderModal from "../modals/create-order";
import { useState } from "react";
import { Button } from "../ui/button";

export default function CreateOrder({
    disabled,
    isAdressExist,
}: {
    disabled?: boolean;
    isAdressExist: boolean;
}) {
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    return (
        <>
            <AnimatePresence>
                {showCreateModal && (
                    <CreateOrderModal
                        setShow={setShowCreateModal}
                        isAdressExist={isAdressExist}
                    />
                )}
            </AnimatePresence>
            <Button
                className="w-full cursor-pointer py-6"
                variant="outline"
                disabled={disabled}
                onClick={() => setShowCreateModal(true)}
            >
                Zleć naprawę
            </Button>
        </>
    );
}
