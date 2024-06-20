import { createConnection } from "mysql2/promise";

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'Pizzeria'
}

const connection = await createConnection(config);

export class UserModel {
    static async getUser({email, password}) {
        try {
            const [user] = await connection.query('SELECT BIN_TO_UUID(id) id, name, email FROM Users WHERE email = ? AND password = ?', [email, password]);
            console.log(user);
            if (user.length === 0) return {message: 'Username or password incorrect'}
            return user[0];
        } catch (error) {
            return {message: 'Error getting user'};
        }
    }
    static async getById({id}) {
        try {
            const [userById] = await connection.query('SELECT BIN_TO_UUID(id) id, name, email FROM Users WHERE ID = UUID_TO_BIN(?);', [id]);
            if (userById.length === 0) return null;
            return userById[0];
        } catch (error) {
            return {message: 'Error getting user by id'};
        }
    }
    static async create({input}) {
        const {name, email, password} = input.data;
        const id = crypto.randomUUID();
        try {
            const [result] = await connection.query('SELECT email FROM Users WHERE email = ?;', [email]);
            if (result.length > 0) return {message: 'User already exists'};
            await connection.query('INSERT INTO Users (id, name, email, password) VALUES (UUID_TO_BIN(?), ?, ?, ?);', [id, name, email, password]);
            return {message: 'User created successfully'};
        } catch (error) {
            return {message: 'Error creating user'};
        }

    }
    static async delete({id}) {
        try {
            await connection.query('DELETE FROM Users WHERE id = UUID_TO_BIN(?)', [id])
        } catch (error) {
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