import mysql from 'mysql2/promise';
import envGetter from '../config/envGetter.js';

const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = envGetter();

const dbPool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    connectionLimit: 10,
    dateStrings: true
});

export default dbPool;