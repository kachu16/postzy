export type LoginFormData = {
    email: string,
    password: string
}

export type RegisterFormData = {
    username: string,
    email: string,
    password: string
}

export type FormErrors = {
    username?: string,
    email?: string,
    password?: string
}

type FormType = "login" | "register";

export function validateForm(data: LoginFormData | RegisterFormData, type: FormType): FormErrors {
    const errors: FormErrors = {};

    if (type === "register" && "username" in data && data.username.length < 6) {
        errors.username = "Username must have more than 6 chracters."
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Email is not valid."
    }
    if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }
    return errors;
}