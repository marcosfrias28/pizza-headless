import { z } from "zod";

const userSchema = z.object({
    name: z.string(({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required'
    })).min(3, {
        message: 'Name must be at least 3 characters long'
    }),
    email: z.string(({
        invalid_type_error: 'Mail must be a string',
        required_error: 'Mail is required',
        invalid_email_error: 'Mail must be a valid email'
    })).email(({
        message: 'Mail must be a valid email'
    })),
    password: z.string(({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required'
    })).min(8, {
        message: 'Password must be at least 8 characters long'
    })
})

export async function validateUser(user) {
    try {
        return userSchema.parse(user);
    } catch (error) {
        return {error: error.issues[0].message};
    }
}