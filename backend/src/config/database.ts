import 'dotenv/config';
import { Dialect, Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize({
  database: dbName,
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  dialect: dbDriver,
  logging: true, // para ver queries (depois pode mudar)
});

// Sincroniza criando tabelas se não existirem
sequelizeConnection
  .sync()
  .then(() => console.log('Tabelas sincronizadas com sucesso!'))
  .catch((error) => console.error('Erro ao sincronizar tabelas:', error));

// sequelizeConnection
//   .sync({ alter: true })
//   .then(() => console.log('Tabelas sincronizadas com sucesso!'))
//   .catch((error) => console.error('Erro ao sincronizar tabelas:', error));

export default sequelizeConnection;
