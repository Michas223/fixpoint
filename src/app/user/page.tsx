import User from "@/components/user/user";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User as UserType } from "@prisma/client";

interface PageProps {
    searchParams: Promise<{ id: string }>;
}

export default async function Page({ searchParams }: PageProps) {
    const sp = await searchParams;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return redirect("/login");

    let userId = sp.id;

    const user = session.user;

    if (!userId || user.role !== "admin")
        return <User userData={user as UserType} isSelfProfile={true} />;

    const dbUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (!dbUser) return <User />;

    return (
        <>
            <User userData={dbUser} />
        </>
    );
}
