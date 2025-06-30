"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Icons } from "@/components/icons";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem("cookiesAccepted");
        if (!cookiesAccepted) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem("cookiesAccepted", "true");
    };
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-4 z-50 w-full md:w-auto md:max-w-sm right-1/2 translate-x-1/2 px-4 md:right-4 md:translate-x-0 md:px-0"
        >
            <Card className="shadow-lg border">
                <CardContent className="px-4">
                    <div className="flex items-start gap-3">
                        <Icons.cookie className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1 space-y-3">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Ta strona używa plików cookies w celu
                                świadczenia usług na najwyższym poziomie.
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleAccept}
                                    size="sm"
                                    className="flex-1 cursor-pointer"
                                >
                                    Rozumiem
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
