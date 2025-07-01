"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newOrder } from "@/actions/orders";
import { CreateOrderSchema } from "@/lib/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export default function CreateOrderModal({
    setShow,
    isAdressExist,
}: {
    setShow: (state: boolean) => void;
    isAdressExist: boolean;
}) {
    const [error, setError] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof CreateOrderSchema>>({
        resolver: zodResolver(CreateOrderSchema),
        defaultValues: {
            deviceType: "laptop",
            otherDeviceType: "",
            device: "",
            description: "",
            deliveryMethod: "myself",
        },
    });

    const onSubmit = async (values: z.infer<typeof CreateOrderSchema>) => {
        setIsPending(true);
        setError("");

        try {
            const res = await newOrder(values);

            if (!res.success) {
                setError(res.message || "Wystąpił nieznany błąd");
                return;
            }

            router.push(`/orders/${res.orderId}`);
        } catch (error) {
            setError("Wystąpił błąd podczas wysyłania zlecenia");
        } finally {
            setIsPending(false);
        }
    };

    const deliveryMethod = form.watch("deliveryMethod");
    const addressRequired = ["tech_arrival", "delivery"];

    useEffect(() => {
        setError(
            addressRequired.includes(deliveryMethod) && !isAdressExist
                ? "Dla podanego dostarczenia sprzętu wymagane jest podanie adresu w ustawieniach profilu."
                : ""
        );
    }, [deliveryMethod]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-screen w-screen fixed left-1/2 top-1/2 -translate-1/2 flex justify-center items-center bg-black/40 z-10"
            >
                <div className="w-96 md:w-2xl lg:w-4xl bg-background p-6 rounded-md border-border border-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">Zleć naprawę</p>
                        <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer"
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            <Icons.x className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
                            <span className="sr-only">Close modal</span>
                        </Button>
                    </div>
                    <Separator className="my-4" />
                    {error && (
                        <Alert variant="destructive" className="my-4">
                            <Icons.x className="h-4 w-4" />
                            <AlertTitle>Wystąpił błąd!</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="flex gap-2 items-end">
                                <FormField
                                    control={form.control}
                                    name="deviceType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Typ urządzenia
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Wybierz typ urządzenia" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="laptop">
                                                        Laptop
                                                    </SelectItem>
                                                    <SelectItem value="pc">
                                                        Komputer
                                                    </SelectItem>
                                                    <SelectItem value="telefon">
                                                        Telefon
                                                    </SelectItem>
                                                    <SelectItem value="konsola">
                                                        Konsola
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        Inne
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch("deviceType") === "other" && (
                                    <FormField
                                        control={form.control}
                                        name="otherDeviceType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Drukarka"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                            <FormField
                                control={form.control}
                                name="device"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nazwa urządzenia</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Iphone 15 Pro Max Biały 256GB"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Opis problemu</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Telefon się nie włącza"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deliveryMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Sposób dostarczenia sprzętu
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col"
                                            >
                                                <FormItem className="flex items-center gap-3">
                                                    <FormControl>
                                                        <RadioGroupItem value="myself" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Dostarczę osobiście
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center gap-3">
                                                    <FormControl>
                                                        <RadioGroupItem value="tech_arrival" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Proszę o dojazd technika
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center gap-3">
                                                    <FormControl>
                                                        <RadioGroupItem value="delivery" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Wyślę kurierem
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full my-2 cursor-pointer"
                                disabled={
                                    isPending ||
                                    (addressRequired.includes(deliveryMethod) &&
                                        !isAdressExist)
                                }
                                aria-disabled={isPending}
                            >
                                {isPending && (
                                    <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Potwierdź
                            </Button>
                        </form>
                    </Form>
                </div>
            </motion.div>
        </>
    );
}
