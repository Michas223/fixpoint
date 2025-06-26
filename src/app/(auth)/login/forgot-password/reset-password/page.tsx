import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/reset-password-form";

function ResetPasswordFallback() {
    return (
        <div className="grow flex flex-col bg-background">
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="w-xl p-8 rounded-2xl shadow-lg border border-accent md:order-1">
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <div className="h-8 w-8 bg-primary/20 rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2 text-center">
                            <div className="h-8 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="space-y-4">
                            <div className="h-10 bg-gray-200 rounded animate-pulse" />
                            <div className="h-10 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<ResetPasswordFallback />}>
            <ResetPasswordForm />
        </Suspense>
    );
}
