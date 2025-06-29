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
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [phoneNumberClient(), adminClient()],
});
