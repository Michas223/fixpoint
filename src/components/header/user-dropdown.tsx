"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "../icons";
import Link from "next/link";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface UserDropDownProps {
    isLoggedIn: boolean;
    isAdmin: boolean;
}

export default function UserDropDown({
    isLoggedIn: initialIsLoggedIn,
    isAdmin: initialIsAdmin,
}: UserDropDownProps) {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
    const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

    useEffect(() => {
        setIsLoggedIn(initialIsLoggedIn);
        setIsAdmin(initialIsAdmin);
    }, [initialIsLoggedIn, initialIsAdmin]);

    const handleSignOutClick = async () => {
        setIsLoggedIn(false);
        setIsAdmin(false);

        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="size-9 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer">
                            <Icons.user />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link href={"/user"}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Profil
                                </DropdownMenuItem>
                            </Link>

                            <Link href="/dashboard">
                                <DropdownMenuItem className="cursor-pointer">
                                    {isAdmin
                                        ? "Panel administracyjny"
                                        : "Zlecone naprawy"}
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                onClick={handleSignOutClick}
                                className="cursor-pointer"
                            >
                                Wyloguj się
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <Link href={"/login"}>
                    <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                    >
                        <Icons.user />
                        <span className="sr-only">Login</span>
                    </Button>
                </Link>
            )}
        </>
    );
}
