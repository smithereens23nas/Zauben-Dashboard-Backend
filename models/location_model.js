module.exports = (sequelize, Sequelize) => {
    const Locations = sequelize.define("locations", {
      // @TODO implement new UUID for primary key
      StreetAddress: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      City: {
        type: Sequelize.STRING,
        allowNull: false
      },
      State: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ZipCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return Locations;
  };