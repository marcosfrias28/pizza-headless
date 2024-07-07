import bcrypt from 'bcrypt'
import { db, Users, eq } from 'astro:db'

type NewUser = typeof Users.$inferInsert

export interface LoginParams {
  email: string
  password: string
}

export interface LoginResponse {
  user?: {
    id: string
    name: string
    email: string
  }
  success?: string
  error?: string
}

export class UserModel {
  static async register ({ name, email, password }: NewUser) {
    const id = crypto.randomUUID() // Random id generator for the user

    try {
      const result = await db
        .select({
          email: Users.email
        })
        .from(Users)
        .where(eq(Users.email, email))

      if (result.length > 0) return { error: 'User already exists' }

      await db.insert(Users).values({
        id,
        name,
        email,
        password
      })
      return { user: { id, name, email }, success: 'User created succesfully' }
    } catch {
      return { error: 'Internal Error creating user' }
    }
  }

  static async login ({ email, password }: LoginParams): Promise<LoginResponse> {
    try {
      const result = await db
        .select({
          password: Users.password
        })
        .from(Users)
        .where(eq(Users.email, email))

      if (result.length < 1) { return { error: 'Invalid password or email. check it out' } }

      // Check if the user exists and if the password is correct
      const hashedPassword = result[0]?.password
      const isValid = await bcrypt.compare(password, hashedPassword)

      // If the user does not exist or the password is incorrect, return an error
      if (!isValid) { return { error: 'Invalid password or email. check it out' } }

      // If the user exists and the password is correct,Add the user to the dabatase
      const user = await db
        .select({
          id: Users.id,
          name: Users.name,
          email: Users.email
        })
        .from(Users)
        .where(eq(Users.email, email))
      return { user: user[0], success: 'User logged in, Redirecting...' }
    } catch {
      return { error: 'Internal Error logging in user' }
    }
  }

  static async delete ({ id }: any) {
    try {
      await db.delete(Users).where(eq(Users.id, id))
      return {
        success: 'User deleted, this action persists and cannot be deactivated'
      }
    } catch {
      return { error: 'Error deleting user' }
    }
  }

  static async update () {
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
    //   }
    // }
    return { error: 'Error updating user password' }
  }
}
