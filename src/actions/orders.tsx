"use server";

import { auth } from "@/lib/auth/auth";
import { getUserIP } from "@/lib/ip";
import { rateLimiter } from "@/lib/limiter";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import {
    ChangeOrderStatusSchema,
    CreateOrderSchema,
    SetOrderArrivedAtSchema,
    SetOrderCompletionDateSchema,
    SetOrderPriceSchema,
} from "@/lib/zod";
import z from "zod";
import { OrderDeliveryMethod } from "@prisma/client";

export async function newOrder(values: z.infer<typeof CreateOrderSchema>) {
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

        const createdOrder = await db.order.create({
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
            orderId: createdOrder.id,
        };
    } catch {
        return {
            message: "Coś poszło nie tak!",
        };
    }
}

export async function changeOrderStatus(
    orderId: string,
    values: z.infer<typeof ChangeOrderStatusSchema>
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

        if (session.user.role !== "admin") {
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

        await db.order.update({
            where: {
                id: Number(orderId.replace("0", "")),
            },
            data: {
                currentStatus: values.status,
                history: {
                    create: [
                        {
                            status: values.status,
                            message: values.description,
                        },
                    ],
                },
            },
        });

        revalidatePath(`/orders/${orderId}`);

        return {
            success: true,
        };
    } catch {
        return {
            message: "Coś poszło nie tak!",
        };
    }
}

export async function setOrderPrice(
    orderId: string,
    values: z.infer<typeof SetOrderPriceSchema>
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

        if (session.user.role !== "admin") {
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

        await db.order.update({
            where: {
                id: Number(orderId.replace("0", "")),
            },
            data: {
                price: values.price,
            },
        });

        revalidatePath(`/orders/${orderId}`);

        return {
            success: true,
        };
    } catch {
        return {
            message: "Coś poszło nie tak!",
        };
    }
}

export async function setArrivedAt(
    orderId: string,
    values: z.infer<typeof SetOrderArrivedAtSchema>
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

        if (session.user.role !== "admin") {
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

        await db.order.update({
            where: {
                id: Number(orderId.replace("0", "")),
            },
            data: values,
        });

        revalidatePath(`/orders/${orderId}`);

        return {
            success: true,
        };
    } catch {
        return {
            message: "Coś poszło nie tak!",
        };
    }
}

export async function setCompletionDate(
    orderId: string,
    values: z.infer<typeof SetOrderCompletionDateSchema>
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

        if (session.user.role !== "admin") {
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

        await db.order.update({
            where: {
                id: Number(orderId.replace("0", "")),
            },
            data: values,
        });

        revalidatePath(`/orders/${orderId}`);

        return {
            success: true,
        };
    } catch {
        return {
            message: "Coś poszło nie tak!",
        };
    }
}
