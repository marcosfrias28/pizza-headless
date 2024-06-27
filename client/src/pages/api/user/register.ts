import type { APIContext, APIRoute } from "astro";
import { validateUser } from "../validations/userSchema";
import bcrypt from "bcrypt";
import { UserModel } from "../models/mysql/user.model";
import { res } from "../utils/Response";

export const POST : APIRoute = async ({ request }: APIContext) => {
  const { name, email, password } = await request.json();
    console.log(name, email, password);
  const result = await validateUser({ name, email, password });
  console.log(result.error);
  
  if (result.success === true) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = { name, email, password: hashedPassword };
      const message = await UserModel.register(user);
      return res(message, 200, "OK");
    } catch {
      res({ message: "Error creating user" }, 500, "Internal Server Error");
    }
  } else {
    res({ message: "Invalid User", error: result.error }, 400, "Bad Request");
  }
};
