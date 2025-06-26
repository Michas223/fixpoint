import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "FixPoint",
    description: "Twój serwis komputerowy",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
            suppressHydrationWarning
        >
            <body className={`${inter.variable} antialiased`}>
                <SpeedInsights />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        {children}
                        <Toaster />
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
