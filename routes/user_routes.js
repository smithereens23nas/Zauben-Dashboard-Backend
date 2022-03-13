module.exports = (app) => {
  const users = require("../controllers/user_controller");

  let router = require("express").Router();

  router.get("/test", (req, res) => {
    res.send("Hello World");
  });

  // Create new article
  router.post("/register", users.create);

  // Retrieve all Users
  // router.get("/all", users.findAll);

  // Retrieve single User by ID
  router.get("/:id", users.findOne);

  // Update Single User
  router.put("/:id", users.update);

  // delete Single User
  router.delete("/:id", users.delete);

  // Set articles for user
  //     router.put("/:id/setLocation", users.setUserArticle)

  // delete article for user
  //     router.delete("/:id/deleteLocation", users.deleteUserArticle)

  app.use("/auth/users", router);
};
