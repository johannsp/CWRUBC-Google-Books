import axios from "axios";

// Export an object containing API methods

export default {
  searchTitle: function(title) {
    const baseUrl = "/api/search/title/";
    const queryURL = baseUrl + title;
    console.log("GoogleBooks queryURL=\n", queryURL);
    return axios.get(queryURL);
  }
};
