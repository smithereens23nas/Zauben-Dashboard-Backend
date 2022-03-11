module.exports = app => {
    const performance = require("../controllers/performance_controller");

    let router = require("express").Router();

    router.get('/test', (req, res) => {
        res.send('Hello World')
    })


    // Create new article
    router.post("/", performance.create);
    
    // Search all performance by original_title
    // router.get("/", performance.findAllBySearch);

    // Retrieve all performance
    router.get("/all", performance.findAll);

    // Retrieve single User by ID
    router.get("/:id", performance.findOne);

    // Update Single User
    // router.put("/:id", performance.update);
    
    // delete Single User
    // router.delete("/:id", performance.delete);
    
    // Set articles for user
//     router.put("/:id/setLocation", performance.setUserArticle)
  
    // delete article for user
//     router.delete("/:id/deleteLocation", performance.deleteUserArticle)

app.use('/auth/performance', router);
  };