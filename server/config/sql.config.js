import dotenv from 'dotenv';
dotenv.config();

const MYSQL_CONFIG = {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
}

export default MYSQL_CONFIG;