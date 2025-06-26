import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Page() {
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

                            <Alert variant="success">
                                <Icons.check className="h-4 w-4" />
                                <AlertTitle>Sukces!</AlertTitle>
                                <AlertDescription>
                                    Wiadomość e-mail została wysłana.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
