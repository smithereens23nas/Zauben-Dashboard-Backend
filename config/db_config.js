require("dotenv").config();
module.exports = {
  //PRODUCTION
  production: {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    port: process.env.PORT,
  },
  development: {
    HOST: process.env.DEVHOST,
    USER: process.env.DEVUSER,
    PASSWORD: process.env.DEVPASSWORD,
    DB: process.env.DEVDB,
    dialect: "postgres",
    port: process.env.DEVPORT,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
// const sequelize = new Sequelize('zauben', 'nicholassmith', 'Steelers23!', {
//     host: 'localhost',
//     dialect: 'postgres',
//     port: 3001
//   });
