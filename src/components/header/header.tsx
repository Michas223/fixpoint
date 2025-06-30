import NavBar from "@/components/header/nav-bar";
import { ModeToggle } from "@/components/theme/theme-switch";
import Image from "next/image";
import UserDropDown from "@/components/header/user-dropdown";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Header() {
    let isLoggedIn = true;
    let isAdmin = false;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) isLoggedIn = false;

    if (session?.user.role === "admin") isAdmin = true;

    return (
        <>
            <header className="w-full border-b">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="h-full flex justify-start items-center gap-4">
                        <div className="hidden md:flex h-full justify-center items-center pr-4 md:pr-6 border-r md:border-r-3">
                            <Link href={"/"} className="cursor-pointer">
                                <Image
                                    src="/v4.svg?height=32&width=32"
                                    width={32}
                                    height={32}
                                    alt=""
                                    className="object-cover"
                                    priority
                                />
                            </Link>
                        </div>
                        <NavBar />
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <ModeToggle />
                        <UserDropDown
                            isLoggedIn={isLoggedIn}
                            isAdmin={isAdmin}
                        />
                    </div>
                </div>
            </header>
        </>
    );
}
