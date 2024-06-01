import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'Pizzeria'
};

const connection = await mysql.createConnection(config)


export class PizzaModel {
    static async getAllPizzas() {
        const [rows] = await connection.query('SELECT * FROM pizzas');
        console.log(rows);
     }
    static async getById({id}) { }
    static async create({input}) { }
    static async delete({id}) { }
    static async update({id, input}) { }
}