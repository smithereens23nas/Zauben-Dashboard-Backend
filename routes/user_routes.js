module.exports = (app) => {
  const users = require("../controllers/user_controller");

  let router = require("express").Router();

  router.get("/test", (req, res) => {
    res.send("Hello World");
  });

  // Create new user
  router.post("/register", function(req, res){
    console.log(users.create)
    users.create
  });

  // Login User
  router.post("/login", function(req, res){
  users.create});

  // Retrieve single User by ID
  router.get("/:id", function(req, res){users.findOne});

  // Update Single User
  router.put("/:id", function(req, res){users.update});

  // delete Single User
  router.delete("/:id", function(req, res){users.delete});

  router.post("/tokenIsValid", function(req, res){users.create})

  // Set articles for user
  //     router.put("/:id/setLocation", users.setUserArticle)

  // delete article for user
  //     router.delete("/:id/deleteLocation", users.deleteUserArticle)

  app.use("/auth/users", router);
};
