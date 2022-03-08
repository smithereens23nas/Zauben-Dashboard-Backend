
module.exports = {

    HOST: "localhost", 
    USER: "nicholassmith",
    PASSWORD: "Welcome23!",
    DB: "zauben_test",
    dialect: "postgres",
    port: 3002,

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
