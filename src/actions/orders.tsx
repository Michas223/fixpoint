"use server";

import { auth } from "@/lib/auth/auth";
import { getUserIP } from "@/lib/ip";
import { rateLimiter } from "@/lib/limiter";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateOrderSchema } from "@/lib/zod";
import z from "zod";
import { OrderDeliveryMethod } from "@prisma/client";

export default async function newOrder(
    values: z.infer<typeof CreateOrderSchema>
) {
    try {
        const clientIp = await getUserIP();
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return {
                message: "Nie jesteś zalogowany.",
            };
        }

        try {
            await rateLimiter.consume(clientIp, 2);
        } catch {
            return {
                message: "Za dużo żądań. Spróbuj ponownie za chwilę.",
            };
        }

        await db.order.create({
            data: {
                title: values.device,
                description: values.description,
                deliveryMethod:
                    values.deliveryMethod.toUpperCase() as OrderDeliveryMethod,
                userId: session.user.id,
                history: {
                    create: [
                        {
                            status: "PENDING",
                            message:
                                "Twoje zlecenie trafiło do serwisanta! Wkrótce zostanie przeanalizowane, a my przygotujemy dla Ciebie wycenę.",
                        },
                    ],
                },
            },
        });

        revalidatePath("/dashboard");

        return {
            success: true,
        };
    } catch {
        return {
            message: "Coś poszło nie tak!",
        };
    }
}
