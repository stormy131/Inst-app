require('dotenv').config();
import { Sequelize } from 'sequelize';

console.log(process.env.MYSQL_HOST_IP);

const seq = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost'
});

export default seq;