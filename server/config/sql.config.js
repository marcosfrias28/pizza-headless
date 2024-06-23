import dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';
dotenv.config();

const MYSQL_CONFIG = {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
}
const connection = await createConnection(MYSQL_CONFIG);

export default connection;