import { Sequelize } from "sequelize";
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize({
  dialect: "postgres",
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
