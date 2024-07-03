import dotenv from "dotenv";
dotenv.config();

const MYSQL_CONFIG = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  connectionLimit: 10,
  waitForConnections: true,
  enableKeepAlive: true,
  idleTimeout: 30000,
  maxIdle: 10,
};

export default MYSQL_CONFIG;
