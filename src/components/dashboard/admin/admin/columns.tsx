"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

const orderStatus = {
    PENDING: "Oczekujące",
    DELIVERY: "Dostawa",
    DIAGNOZE: "Diagnoza",
    WAITING_FOR_PARTS: "Oczekiwanie na części",
    IN_PROGRESS: "W trakcie",
    COMPLETED: "Zakończone",
    CANCELLED: "Anulowane",
};

export type Order = {
    id: string;
    email: string;
    title: string;
    status: OrderStatus;
    createdAt: Date;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return (row.getValue("id") as string).padStart(7, "0");
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "title",
        header: "Tytuł",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const rawStatus = row.getValue("status") || "PENDING";
            const status = rawStatus as keyof typeof orderStatus;

            return orderStatus[status];
        },
    },
    {
        accessorKey: "createdAt",
        header: "Data stworzenia",
        cell: ({ row }) => {
            return format(row.getValue("createdAt"), "Pp");
        },
    },
    {
        id: "actions",
        header: "Akcje",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Otwórz menu</span>
                            <Icons.moreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                        <Link href={`/orders/${row.getValue("id")}`}>
                            <DropdownMenuItem>Zobacz zlecenie</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
