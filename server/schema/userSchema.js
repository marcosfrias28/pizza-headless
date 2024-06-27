import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(),
    email: z.string().email(),
    password: z.string().min(8)
})

export async function validateUser(user) {
    return userSchema.safeParse(user);
}