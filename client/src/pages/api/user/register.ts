import type { APIContext, APIRoute } from "astro";
import { validateUser } from "../validations/userSchema";
import bcrypt from "bcrypt";
import { UserModel } from "../models/astrodb/user.model";
import { res } from "../utils/Response";

export const POST: APIRoute = async ({ request }: APIContext) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const VALIDATION = await validateUser({ name, email, password });
  if (VALIDATION.success === true) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = { name, email, password: hashedPassword };
      const message = await UserModel.register(user);
      return res(message, 200, "OK");
    } catch {
      return res(
        { message: "Error creating user" },
        500,
        "Internal Server Error"
      );
    }
  } else {
    return res(
      { message: "Invalid User", error: VALIDATION.error },
      400,
      "Bad Request"
    );
  }
};
