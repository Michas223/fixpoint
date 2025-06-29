import { OrderStatus } from "@prisma/client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { ChangeOrderStatusSchema } from "@/lib/zod";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { changeOrderStatus } from "@/actions/orders";

const orderStatusOptions = [
    { value: OrderStatus.PENDING, label: "Oczekujące", defaultMessage: "a" },
    { value: OrderStatus.DELIVERY, label: "Dostawa", defaultMessage: "b" },
    { value: OrderStatus.DIAGNOZE, label: "Diagnoza", defaultMessage: "c" },
    {
        value: OrderStatus.WAITING_FOR_PARTS,
        label: "Oczekiwanie na części",
        defaultMessage: "d",
    },
    { value: OrderStatus.IN_PROGRESS, label: "W trakcie", defaultMessage: "e" },
    { value: OrderStatus.COMPLETED, label: "Zakończone", defaultMessage: "f" },
    { value: OrderStatus.CANCELLED, label: "Anulowane", defaultMessage: "g" },
];

export default function ChangeStatusModal({
    orderId,
    currentStatus,
    setShow,
}: {
    orderId: string;
    currentStatus: OrderStatus;
    setShow: (state: boolean) => void;
}) {
    const [error, setError] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);

    const form = useForm<z.infer<typeof ChangeOrderStatusSchema>>({
        resolver: zodResolver(ChangeOrderStatusSchema),
        defaultValues: {
            status: currentStatus,
            description: orderStatusOptions.find(
                (el) => el.value === currentStatus
            )?.defaultMessage,
        },
    });

    const onSubmit = async (
        values: z.infer<typeof ChangeOrderStatusSchema>
    ) => {
        setIsPending(true);
        setError("");

        try {
            const res = await changeOrderStatus(orderId, values);

            if (!res.success) {
                setError(res.message || "Wystąpił nieznany błąd");
                return;
            }

            setShow(false);
        } catch (error) {
            setError("Wystąpił błąd podczas wysyłania zlecenia");
        } finally {
            setIsPending(false);
        }
    };

    const status = form.watch("status");
    const { setValue } = form;

    useEffect(() => {
        const message = orderStatusOptions.find(
            (el) => el.value === status
        )?.defaultMessage;
        if (status && message) {
            setValue("description", message);
        }
    }, [status, setValue]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-screen w-screen fixed left-1/2 top-1/2 -translate-1/2 flex justify-center items-center bg-black/40 z-10"
            >
                <div className="w-full max-w-md bg-background p-6 rounded-lg border shadow-lg">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">
                            Zmień status zlecenia
                        </p>
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
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Wybierz status zamówienia" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {orderStatusOptions.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Opis</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Części zostały zamówione"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full my-2 cursor-pointer"
                                disabled={isPending}
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
