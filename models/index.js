// require local dependencies
const dbConfig = require("../config/db_config");

// require Sequelize
const Sequelize = require("sequelize");

// instantiate new instance of sequelize
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: (...msg) => console.log(msg),
  // @TODO what is pool??
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// create DB object for export
const db = {};

// add Sequelize to DB object
db.Sequelize = Sequelize;

// add sequelize to DB object
db.sequelize = sequelize;

// require DB models
db.articles = require("./article.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

//Establishing many-to-many relationship
// @TODO Look into establishing many-to-many and finding join table
db.articles.belongsToMany(db.users, {
  through: "user_article",
  as: "users",
  // foreignKey: "articles_id"
});

// console.log(db.user_article)
// console.log("Hello World")
db.users.belongsToMany(db.articles, {
  through: "user_article",
  as: "articles",
  // foreignKey: "users_id"
});


// export
module.exports = db;