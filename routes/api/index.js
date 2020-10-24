const router = require("express").Router();
const saveBookRoutes = require("./saveBooks");
const searchBookRoutes = require("./searchBook");

// Book routes
router.use("/books", saveBookRoutes);

// Book routes
router.use("/search", searchBookRoutes);

module.exports = router;
