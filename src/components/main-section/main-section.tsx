"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "../icons";

export default function MainSection() {
    return (
        <>
            <section
                id="strona-glowna"
                className="w-full relative py-12 md:py-31 bg-background"
            >
                <div className="container flex flex-col gap-6 lg:flex-row justify-center lg:gap-12 px-4 md:px-6">
                    <div className="lg:max-w-1/2 flex flex-col justify-center gap-4">
                        <div className="space-y-2">
                            <Badge variant="outline" className="w-fit">
                                Profesjonalny serwis komputerowy
                            </Badge>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Szybka i niezawodna naprawa komputerów
                            </h1>
                            <p className="max-w-[600px] text-zinc-500 md:text-xl">
                                Naprawiamy komputery, laptopy. Szybko, tanio i
                                skutecznie. Gwarancja zadowolenia.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button asChild size="lg">
                                <Link href="/dashboard">Zleć naprawę</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="#uslugi">Nasze usługi</Link>
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Icons.clock className="h-4 w-4" />
                                <span>Szybka realizacja</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Icons.tool className="h-4 w-4" />
                                <span>Doświadczeni technicy</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image
                            src="/v4.svg?height=550&width=550"
                            width={400}
                            height={400}
                            alt="Serwis komputerowy"
                            className="rounded-lg object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
