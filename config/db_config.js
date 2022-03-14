require(dotenv).config()
module.exports = {

    HOST: process.env.HOST, 
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: "postgres",
    port: 8080,

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
