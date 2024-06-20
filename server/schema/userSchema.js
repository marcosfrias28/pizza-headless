import { z } from "zod";
import bcryptjs from 'bcryptjs';

const userSchema = z.object({
    name: z.string(({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required'
    })),
    email: z.string(({
        invalid_type_error: 'Mail must be a string',
        required_error: 'Mail is required',
        invalid_email_error: 'Mail must be a valid email'
    })),
    password: z.string(({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required'
    }))
})

export async function validateUser(user) {

    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(user.password, salt)
    const newUser = { ...user, password: hashedPassword }

    return userSchema.safeParse(newUser);
}