import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NotFound() {
    return (
        <>
            <div className="grow-1 w-full relative p-12">
                <div className="container flex justify-center items-center">
                    <Alert variant="destructive">
                        <Icons.x className="h-4 w-4" />
                        <AlertTitle>Wystąpił błąd!</AlertTitle>
                        <AlertDescription>
                            Zlecenie o podanym ID nie istnieje.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </>
    );
}
