import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail({
    to,
    subject,
    text,
    description,
}: {
    to: string;
    subject: string;
    text: string;
    description: string;
}) {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: `
        <p>${description}</p>
        <p>${text}</p>

        <p>Jeżeli nie wiesz czemu dostałeś tą wiadomość, po prostu ją zignoruj.</p>
        `,
    });
}
