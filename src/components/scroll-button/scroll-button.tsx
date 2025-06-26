"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icons } from "../icons";

export default function ScrollButton() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            const maxScroll = scrollHeight - clientHeight;

            const scrollPercent = (scrollTop / maxScroll) * 100;

            setOpacity(5 - scrollPercent);
        };

        onScroll();

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <Link href="#uslugi">
                <Icons.circleArrowDown
                    style={{
                        opacity: opacity,
                        pointerEvents: opacity <= 0 ? "none" : "all",
                        cursor: opacity <= 0 ? "default" : "pointer",
                    }}
                    className="hidden md:block fixed left-1/2 bottom-12 -translate-x-1/2 size-10 text-accent-foreground stroke-1 animate-bounce"
                />
            </Link>
        </>
    );
}
