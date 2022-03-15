// require local dependencies
const dbConfig = require("../config/db_config");

// require Sequelize
const Sequelize = require("sequelize");
//production 
// instantiate new instance of sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: 5432,
  logging: (...msg) => console.log(msg),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  // @TODO what is pool??
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// const sequelize = new Sequelize(dbConfig.development.DB, dbConfig.development.USER, dbConfig.development.PASSWORD, {
//   host: dbConfig.development.HOST,
//   dialect: dbConfig.development.dialect,
//   operatorsAliases: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

console.log(
  "=========================================================================="
);
console.log(process.env.DATABASE_URL);
console.log(
  "=========================================================================="
);
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
  through: "user_locations", //what we reference our joined table
  as: "locations", //using data from the value ex: using data from locations table
  foreignKey: "users_id",
});

// console.log(db.user_article);
// console.log("Hello World")
db.locations.belongsToMany(db.users, {
  through: "user_locations",
  as: "users",
  foreignKey: "locations_id",
});

db.locations.belongsToMany(db.plants, {
  through: "plants_location",
  as: "plants",
  foreignKey: "locations_id",
});

db.plants.belongsToMany(db.performance, {
  through: "plants_performance",
  as: "performance",
  foreignKey: "plants_id",
});

// export
module.exports = db;
