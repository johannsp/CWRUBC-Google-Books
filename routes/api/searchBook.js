const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// Matches with "/api/search/:id"
router
  .route("/title/:title")
  .get(searchController.searchTitle)

module.exports = router;
