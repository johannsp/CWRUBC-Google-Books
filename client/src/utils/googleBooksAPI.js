import axios from "axios";
import qs from "qs";

// Export an object containing API methods

export default {
  searchTitle: function(title,apiKey) {
    const baseUrl = "https://books.google.com/ebooks?";
    const queryObj = {
      q: `${title}+intitle`,
      key: apiKey
    };
    const queryURL = baseUrl + qs.stringify(queryObj);
    console.log("GoogleBooks queryURL=\n",queryURL);
    return axios.get(queryURL);
  }
};
