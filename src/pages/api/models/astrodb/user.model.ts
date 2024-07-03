import bcrypt from "bcrypt";
import { db, Users, eq, and } from "astro:db";

type NewUser = typeof Users.$inferInsert;

export class UserModel {
  static async register(user: NewUser) {
    const { name, email, password } = user as NewUser;
    const id = crypto.randomUUID();
    try {
      const result = await db
        .select({
          email: Users.email,
        })
        .from(Users)
        .where(eq(Users.email, email));

      if (result.length > 0) return { error: "User already exists" };

      await db.insert(Users).values({
        id,
        name,
        email,
        password,
      });
      return { user: { id, name, email }, message: "User created succesfully" };
    } catch {
      return { error: "Internal Error creating user" };
    }
  }
  static async login({ email, password }: { email: string; password: string }) : Promise<{ user: any, success: string } | { error: string }> {
    try {
      const result = await db
        .select({
          password: Users.password,
        })
        .from(Users)
        .where(eq(Users.email, email));
      const hashedPassword = result[0]?.password;

      if (result.length === 0)
        return { error: "Invalid password or email. check it out" };
      const isValid = await bcrypt.compare(password, hashedPassword);
      if (!isValid) return { error: "Invalid password or email. check it out" };
      const user = await db
        .select({
          id: Users.id,
          name: Users.name,
          email: Users.email,
        })
        .from(Users)
        .where(eq(Users.email, email));
        return { user: user[0], success: "User logged in" };
    } catch {
      return { error: "Internal Error logging in user" };
    }
  }
  static async delete({ id }: any) {
    try {
      await db.delete(Users).where(eq(Users.id, id));
      return {
        message: "User deleted, this action persists and cannot be deactivated",
      };
    } catch {
      return { error: "Error deleting user" };
    }
  }
  static async update({ input }: any) {
    // const { email, password, newEmail, newName, newPassword } = input;
    // if (newEmail) {
    //   try {
    //     await db.update(Users).set({
    //       email: newEmail,
    //     }).where(eq(Users.email, email))
    //     await connection.query(
    //       "UPDATE Users SET email = ? WHERE email = ? AND password = ?",
    //       [newEmail, email, password]
    //     );
    //   } catch {
    //     return { error: "Error updating user email" };
    //   }
    // }
    // if (newName) {
    //   try {
    //     await connection.query(
    //       "UPDATE Users SET name = ? WHERE email = ? AND password = ?",
    //       [newName, email, password]
    //     );
    //   } catch {
    //     return { error: "Error updating user name" };
    //   }
    // }
    // if (newPassword) {
    //   try {
    //     await connection.query(
    //       "UPDATE Users SET password = ? WHERE email = ? AND password = ?",
    //       [newPassword, email, password]
    //     );
    //   } catch {
    //     return { error: "Error updating user password" };
    //   }
    // }
  }
}
