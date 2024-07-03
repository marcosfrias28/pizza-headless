import { type APIContext, type APIRoute } from "astro";
import { UserModel } from "../models/astrodb/user.model";
import { res } from "../utils/Response";
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

config();

export const POST : APIRoute = async ({request} : APIContext) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const loginResult = await UserModel.login({email, password});
    if (loginResult?.error) {
        return res({error: loginResult.error}, 400, "Bad Request");
    }
    const token = jwt.sign({ id: loginResult?.user?.id, email: loginResult?.user?.email}, process.env.TOKEN_SECRET as string, {
        expiresIn: '2h'
    });
    return new Response(JSON.stringify(loginResult), {
        status: 200,
        headers: {
          'Set-Cookie': `access-token=${token}; HttpOnly; Path=/; Max-Age=3600`,
          'Content-Type': 'application/json'
        }
      });
}