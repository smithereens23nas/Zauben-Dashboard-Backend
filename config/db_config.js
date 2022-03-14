require("dotenv").config();
module.exports = {

    HOST: process.env.HOST, 
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    port: process.env.PORT,

    pool: {
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }

}
// const sequelize = new Sequelize('zauben', 'nicholassmith', 'Steelers23!', {
//     host: 'localhost',
//     dialect: 'postgres',
//     port: 3001
//   });
