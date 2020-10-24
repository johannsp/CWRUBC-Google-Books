const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// Matches with "/api/search/:search"
router
  .route("/:search")
  .get(searchController.search)

// Matches with "/api/search/title/:title"
router
  .route("/title/:title")
  .get(searchController.searchTitle)

module.exports = router;
