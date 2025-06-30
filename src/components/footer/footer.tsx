"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <header className="w-full border-t py-6 md:px-12">
                <div className="container flex flex-col items-center justify-center gap-2">
                    <div className="flex justify-center items-center gap-2 font-bold text-xl">
                        <Image
                            src="/placeholder.svg?height=32&width=32"
                            width={32}
                            height={32}
                            alt="FixPoint logo"
                            aria-hidden
                            className="rounded-lg object-cover"
                            priority
                        />
                        <span>FixPoint</span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1">
                        <span className="text-zinc-500 text-sm">
                            © {new Date().getFullYear()} FixPoint. Wszelkie
                            prawa zastrzeżone.
                        </span>
                        <Link
                            href="https://michalprekiel.pl"
                            className="text-zinc-500 text-sm transition-opacity hover:opacity-70"
                        >
                            Strona stworzona przez: Michał Prekiel
                        </Link>
                    </div>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link
                            href="/terms"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Regulamin i Polityka prywatności
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
}
