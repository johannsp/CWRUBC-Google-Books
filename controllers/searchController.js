const axios = require("axios");
const qs = require("qs");
// Add step of loading .env for override information during development
const dotenv = require('dotenv').config();

module.exports = {
  search: function(req, res) {
    const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
    const queryObj = {
      q: `${req.params.search}`,
      key: process.env.GOOGLEBOOKS_API_KEY
    };
    const queryURL = baseUrl + qs.stringify(queryObj);
    console.log("GoogleBooks queryURL=\n",queryURL);
    axios
      .get(queryURL)
      .then(response => {
        const bookData = response.data.items.map(item => {
          const bookItem = {};
          bookItem["title"] = item.volumeInfo["title"]; 
          bookItem["authors"] = item.volumeInfo["authors"];
          bookItem["description"] = item.volumeInfo["description"];
          bookItem["image"] = item.volumeInfo.imageLinks["thumbnail"];
          bookItem["link"] = item.volumeInfo["canonicalVolumeLink"];
          bookItem["_id"] = item["id"];
          return bookItem;
        });
        console.log("∞° bookData=\n", bookData);
        res.json(bookData);
      })
      .catch(error => {
        console.log(error);
        res.send(error);
      });
  },
  searchTitle: function(req, res) {
    const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
    const queryObj = {
      q: `+ontitle:${req.params.title}`,
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
