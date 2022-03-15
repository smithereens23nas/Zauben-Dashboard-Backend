module.exports = (app) => {
  const plants = require("../controllers/plants_controller");

  let router = require("express").Router();

  // @TODO get rid of this get route before deployment
  router.get("/test", (req, res) => {
    res.send("Hello World");
  });

  // Create new article
  router.post("/", plants.create);

  // Search all Users by original_title
  // router.get("/", plants.findAllBySearch);

  // Retrieve all Users
      router.get("/all", plants.findAll);

  // Retrieve single User by ID
      router.get("/:id", plants.findOne);

  // Update Single User
      router.put("/:id", plants.update);

  // delete Single User
      router.delete("/:id", plants.delete);

  // Set articles for user
  //     router.put("/:id/setLocation", plants.setUserArticle)

  // delete article for user
  //     router.delete("/:id/deleteLocation", plants.deleteUserArticle)

  app.use("/plants", router);
};
