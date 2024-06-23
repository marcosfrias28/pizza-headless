import bcrypt from 'bcrypt';
import connection from '../../config/sql.config.js';


export class UserModel {
    static async register(user) {
        const {name, email, password} = user;
        const id = crypto.randomUUID();
        try {
            const [result] = await connection.query('SELECT email FROM Users WHERE email = ?;', [email]);
            if (result.length > 0) return {message: 'User already exists'};
            await connection.query('INSERT INTO Users (id, name, email, password) VALUES (UUID_TO_BIN(?), ?, ?, ?);', [id, name, email, password]);
            return {id, message: 'User created successfully'};
        } catch {
            return {message: 'Internal Error creating user'};
        }

    }
    static async login({email, password}) {
        try {
            const [result] = await connection.query('SELECT password FROM Users WHERE email = ?;', [email]);
            const isValid = bcrypt.compareSync(password, result[0].password);
            if (isValid){
                const [user] = await connection.query('SELECT BIN_TO_UUID(id) as id, name, email FROM Users WHERE email = ?;', [email]);
                console.log(user[0].email + ' logged in');
                return {message: 'User logged in', user: {id: user[0].id, name: user[0].name, email: user[0].email}};
            }
            return {message: 'Invalid credentials'};
        } catch {
            return {message: 'Internal Error logging in user'};
        }
    }
    static async delete({id}) {
        try {
            await connection.query('DELETE FROM Users WHERE id = UUID_TO_BIN(?)', [id])
        } catch {
            return {message: 'Error deleting user'};
        }
    }
    static async update({input}) {
        const {email, password, newEmail, newName, newPassword} = input.data;
        if (newEmail){
            try {
                await connection.query('UPDATE Users SET email = ? WHERE email = ? AND password = ?', [newEmail, email, password])
            } catch (error) {
                return {message: 'Error updating user email'};
            }
        }
        if (newName){
            try {
                await connection.query('UPDATE Users SET name = ? WHERE email = ? AND password = ?', [newName, email, password])
            } catch (error) {
                return {message: 'Error updating user name'};
            }
        }
        if (newPassword){
            try {
                await connection.query('UPDATE Users SET password = ? WHERE email = ? AND password = ?', [newPassword, email, password])
            } catch (error) {
                return {message: 'Error updating user password'};
            }
        }
    }
}