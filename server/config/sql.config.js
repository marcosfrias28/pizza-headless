import dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';
dotenv.config();


const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}
const connection = await createConnection(MYSQL_CONFIG);

export default connection;