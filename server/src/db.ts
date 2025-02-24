import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const Port = process.env.PORT || 5432;
const Host = process.env.HOST || 'localhost';
let User = process.env.DB_USER || '';
let Password = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize('users', User, Password, {
  host: Host,
  port: Number(Port),
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
