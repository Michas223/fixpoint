"use client";

import { useState } from "react";
import type { User as UserType } from "@prisma/client";
import { AnimatePresence } from "motion/react";
import { redirect, unstable_rethrow } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import DeleteAccountModal from "@/components/modals/delete-account";

import { deleteUser, updateUser } from "@/lib/auth/auth-client";
import { EditUserSchema } from "@/lib/zod";

interface UserProfileProps {
    userData?: UserType;
    isSelfProfile?: boolean;
}

interface FormData {
    phoneNumber: string;
    postalCode: string;
    city: string;
    street: string;
    buildingNumber: number | undefined;
    flat: number | undefined;
}

export default function UserProfile({
    userData,
    isSelfProfile,
}: UserProfileProps) {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        phoneNumber: userData?.phoneNumber || "",
        postalCode: userData?.postalCode || "",
        city: userData?.city || "",
        street: userData?.street || "",
        buildingNumber: userData?.buildingNumber || undefined,
        flat: userData?.flat || undefined,
    });

    const handleInputChange = (
        field: keyof FormData,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]:
                field === "buildingNumber" || field === "flat"
                    ? value === ""
                        ? undefined
                        : Number(value)
                    : value,
        }));
        if (error) setError("");
    };

    const handleShowModalDeleteAccount = () => {
        setShowModal(true);
    };

    const handleSubmitModal = async () => {
        setIsLoading(true);
        try {
            await deleteUser();
            redirect(isSelfProfile ? "/" : "/dashboard");
        } catch (err) {
            setError("Nie udało się usunąć konta. Spróbuj ponownie.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        setIsLoading(true);
        setError("");

        try {
            const updateData: Record<string, any> = {};

            if (
                formData.phoneNumber.trim() !== (userData?.phoneNumber || "") &&
                formData.phoneNumber.trim()
            ) {
                updateData.phoneNumber = formData.phoneNumber.trim();
            }

            if (
                formData.postalCode.trim() !== (userData?.postalCode || "") &&
                formData.postalCode.trim()
            ) {
                updateData.postalCode = formData.postalCode.trim();
            }

            if (
                formData.city.trim() !== (userData?.city || "") &&
                formData.city.trim()
            ) {
                updateData.city = formData.city.trim();
            }

            if (
                formData.street.trim() !== (userData?.street || "") &&
                formData.street.trim()
            ) {
                updateData.street = formData.street.trim();
            }

            if (
                formData.buildingNumber !== userData?.buildingNumber &&
                formData.buildingNumber
            ) {
                updateData.buildingNumber = formData.buildingNumber;
            }

            if (formData.flat !== userData?.flat && formData.flat) {
                updateData.flat = formData.flat;
            }

            if (Object.keys(updateData).length === 0) {
                setError("Brak zmian do zapisania");
                return;
            }

            const result = EditUserSchema.safeParse(updateData);
            if (!result.success) {
                const errorMessage = result.error.errors
                    .map((err) => `${err.path.join(".")}: ${err.message}`)
                    .join(", ");
                setError(`Błędy walidacji: ${errorMessage}`);
                return;
            }

            const updateResult = await updateUser(updateData);

            if (updateResult && updateResult.error) {
                setError(`Błąd serwera: ${updateResult.error}`);
                return;
            }

            redirect("/user");
        } catch (err) {
            unstable_rethrow(err);
            setError("Nie udało się zaktualizować profilu. Spróbuj ponownie.");
        } finally {
            setIsLoading(false);
        }
    };

    const hasChanges = () => {
        const phoneChanged =
            formData.phoneNumber.trim() !== (userData?.phoneNumber || "");
        const postalCodeChanged =
            formData.postalCode.trim() !== (userData?.postalCode || "");
        const cityChanged = formData.city.trim() !== (userData?.city || "");
        const streetChanged =
            formData.street.trim() !== (userData?.street || "");
        const buildingChanged =
            formData.buildingNumber !== userData?.buildingNumber;
        const flatChanged = formData.flat !== userData?.flat;

        return (
            phoneChanged ||
            postalCodeChanged ||
            cityChanged ||
            streetChanged ||
            buildingChanged ||
            flatChanged
        );
    };

    if (!userData) {
        return (
            <div className="container mx-auto p-6 max-w-2xl">
                <Alert variant="destructive">
                    <Icons.x className="h-4 w-4" />
                    <AlertTitle>Błąd!</AlertTitle>
                    <AlertDescription>
                        Użytkownik nie istnieje!
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <DeleteAccountModal
                        setShowModal={setShowModal}
                        handleSubmitModal={handleSubmitModal}
                    />
                )}
            </AnimatePresence>

            <div className="grow-1 w-full relative p-12">
                <div className="container flex flex-col gap-8">
                    {error !== "" && (
                        <Alert variant="destructive">
                            <Icons.x className="h-4 w-4" />
                            <AlertTitle>Wystąpił błąd!</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="w-full flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">
                            {isSelfProfile
                                ? "Edycja profilu:"
                                : `Profil użytkownika: ${userData.name}`}
                        </h1>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Podstawowe informacje
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Icons.mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userData.email}
                                            disabled
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Imię i nazwisko
                                    </Label>
                                    <div className="relative">
                                        <Icons.user className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            value={userData.name}
                                            disabled
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefon</Label>
                                <div className="relative">
                                    <Icons.phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phoneNumber",
                                                e.target.value
                                            )
                                        }
                                        placeholder="+48 123 456 789"
                                        className="pl-10"
                                        disabled={
                                            userData.phoneNumber !== null ||
                                            !isSelfProfile
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Adres</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">Miasto</Label>
                                    <div className="relative">
                                        <Icons.mapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "city",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Zbąszynek"
                                            className="pl-10"
                                            disabled={!isSelfProfile}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="postalCode">
                                        Kod pocztowy
                                    </Label>
                                    <div className="relative">
                                        <Icons.mapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="postalCode"
                                            value={formData.postalCode}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "postalCode",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="66-210"
                                            className="pl-10"
                                            disabled={!isSelfProfile}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="street">Ulica</Label>
                                <div className="relative">
                                    <Icons.mapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="street"
                                        value={formData.street}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "street",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Piłsudzkiego"
                                        className="pl-10"
                                        disabled={!isSelfProfile}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="buildingNumber">
                                        Nr. budynku
                                    </Label>
                                    <div className="relative">
                                        <Icons.building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="buildingNumber"
                                            type="number"
                                            min={1}
                                            value={
                                                formData.buildingNumber || ""
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "buildingNumber",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="10"
                                            className="pl-10"
                                            disabled={!isSelfProfile}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="flat">Nr. mieszkania</Label>
                                    <div className="relative">
                                        <Icons.building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="flat"
                                            type="number"
                                            min={1}
                                            value={formData.flat || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "flat",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="10"
                                            className="pl-10"
                                            disabled={!isSelfProfile}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isSelfProfile && (
                            <>
                                <Separator />
                                <div className="flex flex-col gap-3">
                                    <Button
                                        variant="secondary"
                                        onClick={handleUpdateProfile}
                                        disabled={!hasChanges() || isLoading}
                                        className="w-full"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Zapisywanie...
                                            </>
                                        ) : (
                                            "Zapisz zmiany"
                                        )}
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        onClick={handleShowModalDeleteAccount}
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        Usuń konto
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
