"use client";

import { User as UserType } from "@/generated/prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import DeleteAccountModal from "@/components/modals/delete-account";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { deleteUser, updateUser } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PhoneNumberSchema } from "@/lib/zod";

export default function User({
    userData,
    isSelfProfile,
}: {
    userData?: UserType;
    isSelfProfile?: boolean;
}) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>(
        userData?.phoneNumber || ""
    );
    const [error, setError] = useState<string>("");

    const handleShowModalDeleteAccount = () => {
        setShowModal(true);
    };

    const handleSubmitModal = async () => {
        await deleteUser();

        redirect(isSelfProfile ? "/" : "/dashboard");
    };

    const handleUpdatePhoneNumber = async () => {
        if (phoneNumber === userData?.phoneNumber) return;

        const result = PhoneNumberSchema.safeParse({
            phoneNumber: phoneNumber,
        });

        if (!result.success) return setError(result.error.errors[0]?.message);

        setError("");

        await updateUser({
            phoneNumber: phoneNumber,
        });

        redirect("/user");
    };

    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <DeleteAccountModal>
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
                    </DeleteAccountModal>
                )}
            </AnimatePresence>
            <div className="grow-1 w-full relative p-12">
                <div className="container flex flex-col gap-8">
                    {error !== "" && (
                        <Alert variant="destructive">
                            <Icons.x className="h-4 w-4" />
                            <AlertTitle>
                                Wystąpił błąd podczas zmiany numeru telefonu!
                            </AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {!userData ? (
                        <Alert variant="destructive">
                            <Icons.x className="h-4 w-4" />
                            <AlertTitle>Błąd!</AlertTitle>
                            <AlertDescription>
                                Użytkownik nie istnieje!
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="w-full flex flex-col gap-4">
                            <h1 className="text-2xl font-bold">
                                {isSelfProfile
                                    ? "Edycja profilu:"
                                    : `Profil użytkownika: ${userData.name}`}
                            </h1>
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
                                    <div className="w-full md:w-1/2 space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium"
                                        >
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <Icons.mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={userData.email}
                                                disabled
                                                className={`pl-10`}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-2">
                                        <Label
                                            htmlFor="name"
                                            className="text-sm font-medium"
                                        >
                                            Imię i nazwisko
                                        </Label>
                                        <div className="relative">
                                            <Icons.user className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                                            <Input
                                                name="name"
                                                id="name"
                                                className={`pl-10`}
                                                value={userData.name}
                                                disabled
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full space-y-2">
                                    <Label
                                        htmlFor="phone"
                                        className="text-sm font-medium"
                                    >
                                        Telefon
                                    </Label>
                                    <div className="relative">
                                        <Icons.phone className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            defaultValue={phoneNumber}
                                            onInput={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => setPhoneNumber(e.target.value)}
                                            placeholder="+48 123 456 789"
                                            className={`pl-10`}
                                            disabled={
                                                userData.phoneNumber !== null ||
                                                !isSelfProfile
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {isSelfProfile && (
                                <>
                                    <Button
                                        className="w-full cursor-pointer py-6"
                                        variant="secondary"
                                        onClick={handleUpdatePhoneNumber}
                                        disabled={
                                            userData.phoneNumber !== null ||
                                            !isSelfProfile
                                        }
                                    >
                                        Zapisz zmiany
                                    </Button>
                                    <Button
                                        className="w-full cursor-pointer py-6"
                                        variant="destructive"
                                        onClick={handleShowModalDeleteAccount}
                                    >
                                        Usuń konto
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
