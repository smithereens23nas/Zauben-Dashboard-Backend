// require local dependencies
const dbConfig = require("../config/db_config");

// require Sequelize
const Sequelize = require("sequelize");

// instantiate new instance of sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: (...msg) => console.log(msg),
  // @TODO what is pool??
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// create DB object for export
const db = {};

// add Sequelize to DB object
db.Sequelize = Sequelize;

// add sequelize to DB object
db.sequelize = sequelize;

// require DB models
db.plants = require("./plant_model")(sequelize, Sequelize);
db.performance = require("./performance_model")(sequelize, Sequelize);
db.locations = require("./location_model")(sequelize, Sequelize);
db.users = require("./user_model")(sequelize, Sequelize);

//Establishing many-to-many relationship
// @TODO Look into establishing many-to-many and finding join table
db.users.belongsToMany(db.locations, {
  through: "user_locations",
  as: "locations",
  foreignKey: "users_id",
});

console.log(db.user_article);
// console.log("Hello World")
db.locations.belongsToMany(db.users, {
  through: "user_locations",
  as: "users",
  foreignKey: "locations_id",
});

// export
module.exports = db;