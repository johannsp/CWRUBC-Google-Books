const axios = require("axios");
const qs = require("qs");
// Add step of loading .env for override information during development
const dotenv = require('dotenv').config();

module.exports = {
  searchTitle: function(req, res) {
    const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
    const queryObj = {
      q: `${req.params.title}`,
      key: process.env.GOOGLEBOOKS_API_KEY
    };
    const queryURL = baseUrl + qs.stringify(queryObj);
    console.log("GoogleBooks queryURL=\n",queryURL);
    axios
      .get(queryURL)
      .then(response => {
        // Data is already returned in JSON format so just use .send()
        // and only return the data property from the complete response
        res.json(response.data);
      })
      .catch(error => {
        console.log(error);
        res.send(error);
      });
  }
};
