"use server";

import { APIError } from "better-auth/api";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { db } from "../prisma";

interface State {
    errorMessage?: string | null;
}

export async function signUp(pervState: State, formData: FormData) {
    const rawFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmpassword") as string,
        firstName: formData.get("firstname") as string,
        lastName: formData.get("lastname") as string,
        phoneNumber: formData.get("phone") as string,
    };

    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phoneNumber,
    } = rawFormData;

    if (password !== confirmPassword) {
        return {
            errorMessage: "Hasła nie są identyczne.",
        };
    }

    try {
        await auth.api.signUpEmail({
            body: {
                name: `${firstName} ${lastName}`,
                email,
                password,
                phoneNumber,
            },
        });
    } catch (error) {
        if (error instanceof APIError) {
            switch (error.status) {
                case "UNPROCESSABLE_ENTITY":
                    return {
                        errorMessage:
                            "Istnieje konto z podanym adresem e-mail.",
                    };
                case "BAD_REQUEST":
                    return { errorMessage: error.message };
                default:
                    return { errorMessage: "Coś poszło nie tak." };
            }
        }
    }

    redirect("/verify/success-send");
}

export async function signIn(pervState: State, formData: FormData) {
    const rawFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        rememberMe: formData.get("remember") == "on" ? true : false,
    };

    const { email, password, rememberMe } = rawFormData;

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
                rememberMe,
            },
        });
    } catch (error) {
        if (error instanceof APIError) {
            switch (error.status) {
                case "UNAUTHORIZED":
                    return {
                        errorMessage:
                            "Nie znaleziono konta z podanym adresem e-mail.",
                    };
                case "BAD_REQUEST":
                    return { errorMessage: error.message };
                case "FORBIDDEN":
                    redirect("/verify");
                default:
                    return { errorMessage: "Coś poszło nie tak." };
            }
        }
    }

    redirect("/dashboard");
}

export async function searchAccount(email: string) {
    const user = await db.user.findUnique({
        where: {
            email,
        },
    });

    return !!user;
}
