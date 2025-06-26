"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendVerificationEmail } from "@/lib/auth/auth-client";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function SendVerificationEmailForm({
    error,
}: {
    error: string;
}) {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(error || "");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = String(formData.get("email"));

        if (!email) return;

        await sendVerificationEmail({
            email,
            callbackURL: "/verify",
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                },
                onResponse: () => {
                    setIsPending(false);
                },
                onError: (ctx) => {
                    setErrorMessage(ctx.error.message);
                },
                onSuccess: () => {
                    router.push("/verify/success");
                },
            },
        });
    }

    return (
        <>
            {errorMessage !== "" && (
                <Alert variant="destructive">
                    <Icons.x className="h-4 w-4" />
                    <AlertTitle>Wystąpił błąd podczas weryfikacji!</AlertTitle>
                    <AlertDescription>
                        {errorMessage === "invalid_token" ||
                        errorMessage === "token_expired"
                            ? "Token wygasł lub jest nie prawidłowy."
                            : errorMessage}
                    </AlertDescription>
                </Alert>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Email
                    </Label>
                    <div className="relative">
                        <Icons.mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="twoj@email.pl"
                            className={`pl-10`}
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
                    Wyślij
                </Button>
            </form>
        </>
    );
}
