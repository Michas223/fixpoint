import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { SetOrderCompletionDateSchema } from "@/lib/zod";
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
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { setCompletionDate } from "@/actions/orders";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export default function SetCompletionDateModal({
    orderId,
    setShow,
}: {
    orderId: string;
    setShow: (state: boolean) => void;
}) {
    const [error, setError] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);

    const form = useForm<z.infer<typeof SetOrderCompletionDateSchema>>({
        resolver: zodResolver(SetOrderCompletionDateSchema),
        defaultValues: {
            expectedCompletionDate: new Date(),
        },
    });

    const onSubmit = async (
        values: z.infer<typeof SetOrderCompletionDateSchema>
    ) => {
        setIsPending(true);
        setError("");

        try {
            const res = await setCompletionDate(orderId, values);

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
                            Ustaw oczekiwaną datę zakończenia naprawy
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
                                name="expectedCompletionDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>
                                            Oczekiwana data zakończenia zlecenia
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "P"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Wybierz datę
                                                            </span>
                                                        )}
                                                        <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
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
