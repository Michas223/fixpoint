"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/auth/auth-client";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"destructive" | "success">(
        "destructive"
    );
    const [isPending, setIsPending] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            setMessageType("destructive");
            setMessage("Nieprawidłowy token.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        setIsPending(true);

        const { error } = await resetPassword({
            token,
            newPassword: password,
        });

        if (error) {
            setMessageType("destructive");
            setMessage("Nie udało się zmienić hasła.");
        } else {
            setMessageType("success");
            setMessage("Hasło zmienione! Zaloguj się nowym hasłem.");
            setTimeout(() => router.push("/login"), 3000);
        }

        setIsPending(false);
    };

    return (
        <>
            <div className="grow flex flex-col bg-background">
                <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                    <div className="w-xl p-8 rounded-2xl shadow-lg border border-accent md:order-1">
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Icons.lock className="h-8 w-8 text-primary" />
                                </div>
                            </div>

                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Resetowanie hasła
                                </h1>
                                <p className="text-zinc-500">
                                    Wprowadź nowe hasło
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
                                    <AlertDescription>
                                        {message}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium"
                                    >
                                        Nowe hasło
                                    </Label>
                                    <div className="relative">
                                        <Icons.lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="********"
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
                                    Zmień hasło
                                </Button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
