import { createAuthClient } from "better-auth/react";
import { adminClient, phoneNumberClient } from "better-auth/client/plugins";

export const {
    signIn,
    signOut,
    useSession,
    forgetPassword,
    resetPassword,
    signUp,
    sendVerificationEmail,
    deleteUser,
    updateUser,
} = createAuthClient({
    baseURL: "https://fixpoint-liart.vercel.app",
    plugins: [phoneNumberClient(), adminClient()],
});
