module.exports = (sequelize, Sequelize) => {
  const Performance = sequelize.define("performance", {
    // @TODO implement new UUID for primary key
    Time: {
      type: Sequelize.DATEONLY,
    },

    Relative_inHg: {
      type: Sequelize.DECIMAL,
    },

    Absolute_inHg: {
      type: Sequelize.DECIMAL,
    },

    Soilmoisture_CH1: {
      type: Sequelize.INTEGER,
    },

    Soilmoisture_CH2: {
      type: Sequelize.INTEGER,
    },

    Soilmoisture_CH3: {
      type: Sequelize.INTEGER,
    },

    Soilmoisture_CH4: {
      type: Sequelize.INTEGER,
    },

    Soilmoisture_CH5: {
      type: Sequelize.INTEGER,
    },

    Soilmoisture_CH6: {
      type: Sequelize.INTEGER,
    },

    Soilmoisture_CH7: {
      type: Sequelize.INTEGER,
    },

    Soilmoisture_CH8: {
      type: Sequelize.INTEGER,
    },
  });

  return Performance;
};
