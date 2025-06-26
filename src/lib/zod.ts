import { z } from "zod";

export const PhoneNumberSchema = z.object({
    phoneNumber: z.string().regex(/^\+?\d{9,15}$/, {
        message: "Nieprawidłowy numer telefonu",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Nieprawidłowy adres email" }),
    password: z
        .string()
        .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" })
        .max(100)
        .regex(/[A-Z]/, {
            message: "Hasło musi zawierać przynajmniej jedną wielką literę",
        })
        .regex(/[a-z]/, {
            message: "Hasło musi zawierać przynajmniej jedną małą literę",
        })
        .regex(/[0-9]/, {
            message: "Hasło musi zawierać przynajmniej jedną cyfrę",
        })
        .regex(/[\W_]/, {
            message: "Hasło musi zawierać przynajmniej jeden znak specjalny",
        }),
    name: z
        .string()
        .min(4, {
            message: "Imię lub nazwisko musi mieć co najmniej 4 znaki",
        })
        .max(100, { message: "Imię lub nazwisko jest za długie" }),
    phoneNumber: z.string().regex(/^\+?\d{9,15}$/, {
        message: "Nieprawidłowy numer telefonu",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: "Nieprawidłowy adres email" }),
    password: z
        .string()
        .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" })
        .max(100)
        .regex(/[A-Z]/, {
            message: "Hasło musi zawierać przynajmniej jedną wielką literę",
        })
        .regex(/[a-z]/, {
            message: "Hasło musi zawierać przynajmniej jedną małą literę",
        })
        .regex(/[0-9]/, {
            message: "Hasło musi zawierać przynajmniej jedną cyfrę",
        })
        .regex(/[\W_]/, {
            message: "Hasło musi zawierać przynajmniej jeden znak specjalny",
        }),
});

export const CreateOrderSchema = z.object({
    device: z
        .string()
        .min(1, "Nazwa urządzenia jest wymagana")
        .max(100, "Nazwa urządzenia jest zbyt długa"),
    description: z.string().min(1, "Opis problemu jest wymagany"),
    deliveryMethod: z.enum(["myself", "tech_arrival", "delivery"], {
        errorMap: () => ({ message: "Wybierz sposób dostarczenia sprzętu" }),
    }),
});
