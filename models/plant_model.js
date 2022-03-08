module.exports = (sequelize, Sequelize) => {
  const Locations = sequelize.define("locations", {
    // @TODO implement new UUID for primary key
    Locations: {
      type: Sequelize.ENUM({
        values: [
          "Lobby",
          "Conference Room",
          "Common Area",
          "Cafe",
          "Wellness Area",
          "Other",
        ]
      })
    }
  });
  return Locations;
};
