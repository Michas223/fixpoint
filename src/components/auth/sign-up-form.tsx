"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useActionState, useEffect, useState } from "react";
import { signUp } from "@/lib/auth/actions";
import SignInSocial from "@/components/auth/sign-in-social";

export default function SignUpForm() {
    const initialState = { errorMessage: "" };
    const [state, formAction, isPending] = useActionState(signUp, initialState);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "+48",
        password: "",
        confirmpassword: "",
    });

    const switchShowPassword = () => setShowPassword((prev) => !prev);
    const switchShowConfirmPassword = () =>
        setShowConfirmPassword((prev) => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData();
        data.append("firstname", formData.firstname);
        data.append("lastname", formData.lastname);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("password", formData.password);
        data.append("confirmpassword", formData.confirmpassword);

        formAction(data);
    };

    useEffect(() => {
        if (state.errorMessage.length) {
            setError(state.errorMessage);
        }
    }, [state.errorMessage]);

    return (
        <>
            <div className="grow flex flex-col bg-background">
                <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                    <div className="w-2xl p-8 rounded-2xl shadow-lg border border-accent md:order-1">
                        <div className="space-y-6">
                            <div className="space-y-2 text-center md:text-left">
                                <h1 className="text-2xl font-bold">
                                    Utwórz konto
                                </h1>
                                <p className="text-zinc-500">
                                    Dołącz do naszego serwisu komputerowego
                                </p>
                            </div>
                            {error !== "" && (
                                <Alert variant="destructive">
                                    <Icons.x className="h-4 w-4" />
                                    <AlertTitle>
                                        Wystąpił błąd podczas rejestracji!
                                    </AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <SignInSocial provider="google">
                                <svg
                                    className="mr-2 h-4 w-4"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </SignInSocial>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-zinc-500">
                                        lub wypełnij formularz
                                    </span>
                                </div>
                            </div>

                            <form className="space-y-4" action={formAction}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="firstname"
                                            className="text-sm font-medium"
                                        >
                                            Imię
                                        </Label>
                                        <div className="relative">
                                            <Icons.user className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                                            <Input
                                                name="firstname"
                                                id="firstname"
                                                placeholder="Jan"
                                                className={`pl-10`}
                                                value={formData.firstname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="lastname"
                                            className="text-sm font-medium"
                                        >
                                            Nazwisko
                                        </Label>
                                        <div className="relative">
                                            <Icons.user className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                                            <Input
                                                name="lastname"
                                                id="lastname"
                                                placeholder="Kowalski"
                                                className={`pl-10`}
                                                value={formData.lastname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                            name="email"
                                            placeholder="twoj@email.pl"
                                            className={`pl-10`}
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
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
                                            placeholder="+48 123 456 789"
                                            className={`pl-10`}
                                            value={
                                                formData.phone === ""
                                                    ? "+48"
                                                    : formData.phone
                                            }
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium"
                                    >
                                        Hasło
                                    </Label>
                                    <div className="relative">
                                        <Icons.lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="********"
                                            className={`pl-10 pr-10`}
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2.5 transition-colors text-zinc-400 hover:text-zinc-600"
                                            onClick={switchShowPassword}
                                        >
                                            {showPassword ? (
                                                <Icons.eyeOff className="h-5 w-5" />
                                            ) : (
                                                <Icons.eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="confirmpassword"
                                        className="text-sm font-medium"
                                    >
                                        Potwierdź hasło
                                    </Label>
                                    <div className="relative">
                                        <Icons.lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                                        <Input
                                            id="confirmpassword"
                                            name="confirmpassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="********"
                                            className={`pl-10 pr-10`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2.5 transition-colors text-zinc-400 hover:text-zinc-600"
                                            onClick={switchShowConfirmPassword}
                                        >
                                            {showConfirmPassword ? (
                                                <Icons.eyeOff className="h-5 w-5" />
                                            ) : (
                                                <Icons.eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms"
                                        className="mt-1"
                                        required
                                    />
                                    <Label
                                        htmlFor="terms"
                                        className="text-sm font-normal"
                                    >
                                        Akceptuję{" "}
                                        <Link
                                            href="/terms"
                                            className="text-primary hover:underline"
                                        >
                                            regulamin i politykę prywatności
                                        </Link>
                                    </Label>
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
                                    Zarejestruj się
                                </Button>
                            </form>

                            <div className="text-center text-sm">
                                Masz już konto?{" "}
                                <Link
                                    href="/login"
                                    className="text-primary font-medium hover:underline"
                                >
                                    Zaloguj się
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
