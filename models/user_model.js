module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {

      
      first_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
          },
        // @TODO implement new UUID for primary key
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    
    return Users;
};
