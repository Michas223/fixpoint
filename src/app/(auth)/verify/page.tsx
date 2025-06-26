import SendVerificationEmailForm from "@/components/auth/send-verification-email-form";
import { Icons } from "@/components/icons";

interface PageProps {
    searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
    const sp = await searchParams;

    return (
        <>
            <div className="grow flex flex-col bg-background">
                <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                    <div className="w-xl p-8 rounded-2xl shadow-lg border border-accent md:order-1">
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Icons.mail className="h-8 w-8 text-primary" />
                                </div>
                            </div>

                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Weryfikowanie adresu E-mail
                                </h1>
                            </div>

                            <SendVerificationEmailForm error={sp.error} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
