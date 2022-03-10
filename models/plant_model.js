module.exports = (sequelize, Sequelize) => {
  const Plants = sequelize.define("plants", {
    // @TODO implement new UUID for primary key
    Locations: {
      type: Sequelize.ENUM({
        values: [
          "Lobby",
          "Conference Room",
          "Common Area",
          "Cafe",
          "Wellness Area",
          "Other", //add in this feature later where user is able to put input
        ],
      }),
    },
  });
  return Plants;
};
