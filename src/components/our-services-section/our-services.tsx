"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "../icons";

export default function OurServices() {
    return (
        <>
            <section
                id="uslugi"
                className="w-full pt-8 pb-12 bg-second-background"
            >
                <div className="container flex flex-col gap-6 px-4 md:px-6">
                    <div className="flex flex-col justify-center items-center text-center gap-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Nasze usługi
                        </h2>
                        <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Oferujemy szeroki zakres usług naprawy i konserwacji
                            sprzętu komputerowego
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                        <Card className="relative overflow-hidden">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Icons.cpu className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Naprawa komputerów
                                </h3>
                                <p className="text-zinc-500">
                                    Diagnoza i naprawa komputerów stacjonarnych.
                                    Wymiana podzespołów, czyszczenie i
                                    konserwacja.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="relative overflow-hidden">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Icons.laptop className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Naprawa laptopów
                                </h3>
                                <p className="text-zinc-500">
                                    Profesjonalna naprawa laptopów wszystkich
                                    marek. Wymiana matryc, klawiatur, dysków i
                                    innych podzespołów.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="relative overflow-hidden">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Icons.hardDrive className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Składanie komputerów
                                </h3>
                                <p className="text-zinc-500">
                                    Komputer dostosowany do twoich wymagań.
                                    Perfekcyjne ułożenie kabli. Ogólna estetyka.
                                    Wszystkim zajmiemy się my.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Icons.clock className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">
                                    Szybki czas realizacji
                                </h3>
                                <p className="text-zinc-500">
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. At, qui.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Icons.truck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Dojazd</h3>
                                <p className="text-zinc-500">
                                    Oferujemy darmowy dojazd na terenie
                                    Zbąszynka, Chlastawy i Kosieczyna
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Icons.star className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Gwarancja jakości</h3>
                                <p className="text-zinc-500">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Nemo, ut.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
