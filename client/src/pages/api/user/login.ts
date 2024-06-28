import { type APIContext, type APIRoute } from "astro";
import { UserModel } from "../models/mysql/user.model";
import { res } from "../utils/Response";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const POST : APIRoute = async ({request, cookies} : APIContext) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password);
    const user = await UserModel.login({email, password});
    if (user.error) {
        return res({error: user.error}, 400, "Bad Request");
    }
    const token = jwt.sign({ id: user.id, email: user.email}, process.env.TOKEN_SECRET as string, {
        expiresIn: '2h'
    });
    cookies.set('access-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 2
    })
    return res({user}, 200, "OK");
}