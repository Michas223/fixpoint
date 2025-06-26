"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { forgetPassword } from "@/lib/auth/auth-client";
import { searchAccount } from "@/lib/auth/actions";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function ForgotPasswordForm() {
    const params = useSearchParams();
    const emailFromQuery = params.get("email") || "";
    const [email, setEmail] = useState(emailFromQuery);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"destructive" | "success">(
        "destructive"
    );
    const [isPending, setIsPending] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        const found = await searchAccount(email);

        if (found) {
            const { error } = await forgetPassword({
                email,
                redirectTo: `${window.location.origin}/login/forgot-password/reset-password`,
            });

            if (error) {
                setMessageType("destructive");
                setMessage("Coś poszło nie tak. Spróbuj ponownie.");
            } else {
                setMessageType("success");
                setMessage("Sprawdź swoją skrzynkę e-mail.");
            }
        } else {
            setMessageType("destructive");
            setMessage("Konto nie istnieje");
        }
        setEmail("");
        setIsPending(false);
    };

    return (
        <div className="grow flex flex-col bg-background">
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="w-xl p-8 rounded-2xl shadow-lg border border-accent md:order-1">
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <Icons.mail className="h-8 w-8 text-primary" />
                            </div>
                        </div>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold">
                                Resetowanie hasła
                            </h1>
                            <p className="text-zinc-500">
                                Wprowadź swój adres email, a wyślemy Ci link do
                                zresetowania hasła
                            </p>
                        </div>

                        {message && (
                            <Alert variant={messageType}>
                                {messageType === "destructive" ? (
                                    <Icons.x className="h-4 w-4" />
                                ) : (
                                    <Icons.check className="h-4 w-4" />
                                )}
                                <AlertTitle>
                                    {messageType === "destructive"
                                        ? "Wystąpił błąd podczas resetowania hasła!"
                                        : "Sukces"}
                                </AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
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
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="twoj@email.pl"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                                aria-disabled={isPending}
                            >
                                {isPending && (
                                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Wyślij link resetujący
                            </Button>
                        </form>

                        <div className="text-center text-sm">
                            <Link
                                href="/login"
                                className="text-primary font-medium hover:underline inline-flex items-center"
                            >
                                <Icons.arrowLeft className="mr-1 h-3 w-3" />
                                Powrót do logowania
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
