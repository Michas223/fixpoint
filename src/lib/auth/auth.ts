import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, createAuthMiddleware, phoneNumber } from "better-auth/plugins";
import { db } from "../prisma";
import { sendEmail } from "../email";
import { LoginSchema, RegisterSchema } from "../zod";

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        sendResetPassword: async ({ user, url }) => {
            await sendEmail({
                to: user.email,
                subject: "Resetowanie hasła",
                description: "Zarządałeś zmiany hasła na swoim koncie.",
                text: `Kliknij w link aby zresetować hasło: ${url}`,
            });
        },
        resetPasswordTokenExpiresIn: 3600, // 1 godzina
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        expiresIn: 60 * 60,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            const link = new URL(url);
            link.searchParams.set("callbackURL", "/verify");

            await sendEmail({
                to: user.email,
                subject: "Zweryfikuj swój adres e-mail",
                description: "Potwierdź swoje konto klikając w link.",
                text: String(link),
            });
        },
    },
    user: {
        deleteUser: {
            enabled: true,
        },
    },
    account: {
        accountLinking: {
            enabled: true,
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                const result = RegisterSchema.safeParse(ctx.body);

                if (!result.success)
                    throw new APIError("BAD_REQUEST", {
                        message: result.error.errors[0]?.message,
                    });
            } else if (ctx.path === "/sign-in/email") {
                const result = LoginSchema.safeParse(ctx.body);

                if (!result.success)
                    throw new APIError("BAD_REQUEST", {
                        message: result.error.errors[0]?.message,
                    });
            }
        }),
    },
    plugins: [phoneNumber(), admin(), nextCookies()],
});
