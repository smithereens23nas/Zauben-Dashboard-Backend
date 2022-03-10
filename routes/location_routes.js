module.exports = app => {
    const locations = require("../controllers/location_controller");
  
    let router = require("express").Router();
  
    // Create new article
    router.post("/test", locations.create);
    
    // Search all Articles by original_title
    router.get("/", locations.findAllBySearch);
    
    // // Search all Articles by User
    // router.get("/byUser/:contributor", articles.findAllByUser);
    
    // // Retrieve all locations
    // router.get("/all", locations.findAll); //breaking my code
  
    // // Retrieve single Article by ID
    // router.get("/:id", articles.findOne);
  
    // // Update Single Article
    // router.put("/:id", articles.update);
    
    // // delete Single Article
    // router.delete("/:id", articles.delete);
  
    // // set user for article
    // router.put("/:id/setUser", articles.setArticleUser)
  
    // // delete user for article
    // router.delete("/:id/deleteUser", articles.deleteArticleUser)
  
    app.use('/api/locations', router);
  };