import bcrypt from 'bcrypt';
import { createConnection } from 'mysql2/promise';
import MYSQL_CONFIG from '../../config/sql.config';

const connection = await createConnection(MYSQL_CONFIG as any);

interface User {
    name?: string;
    email: string;
    password: string;
}

export class UserModel {
    static async register(user : User) {
        const {name, email, password} = user;
        const id = crypto.randomUUID();
        try {
            const [result] = await connection.query('SELECT email FROM Users WHERE email = ?;', [email]) as any[];
            if (result.length > 0) return {error: 'User already exists'};
            await connection.query('INSERT INTO Users (id, name, email, password) VALUES (UUID_TO_BIN(?), ?, ?, ?);', [id, name, email, password]);
            return {user: {id, name, email}};
        } catch {
            return {error: 'Internal Error creating user'};
        }

    }
    static async login({email, password} : User) {
        try {
            const [result] = await connection.query('SELECT password FROM Users WHERE email = ?;', [email]) as any[];
            const isValid = await bcrypt.compare(password, result[0].password);
            if (isValid){
                const [user] = await connection.query('SELECT BIN_TO_UUID(id) as id, name, email FROM Users WHERE email = ?;', [email]) as any[];
                // console.log(user[0].email + ' logged in');
                return user[0];
            }
            return {error: 'Invalid credentials'};
        } catch {
            return {error: 'Internal Error logging in user'};
        }
    }
    static async delete({id} : any) {
        try {
            await connection.query('DELETE FROM Users WHERE id = UUID_TO_BIN(?)', [id])
        } catch {
            return {error: 'Error deleting user'};
        }
    }
    static async update({input} : any) {
        const {email, password, newEmail, newName, newPassword} = input.data;
        if (newEmail){
            try {
                await connection.query('UPDATE Users SET email = ? WHERE email = ? AND password = ?', [newEmail, email, password])
            } catch{
                return {error: 'Error updating user email'};
            }
        }
        if (newName){
            try {
                await connection.query('UPDATE Users SET name = ? WHERE email = ? AND password = ?', [newName, email, password])
            } catch {
                return {error: 'Error updating user name'};
            }
        }
        if (newPassword){
            try {
                await connection.query('UPDATE Users SET password = ? WHERE email = ? AND password = ?', [newPassword, email, password])
            } catch {
                return {error: 'Error updating user password'};
            }
        }
    }
}