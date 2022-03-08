module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      // @TODO implement new UUID for primary key
      Username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return User;
  };