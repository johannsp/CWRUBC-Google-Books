import axios from "axios";

// Export an object containing API methods

export default {
  search: function(search) {
    const baseUrl = "/api/search/";
    const queryURL = baseUrl + search;
    console.log("GoogleBooks queryURL=\n", queryURL);
    return axios.get(queryURL);
  },
  searchTitle: function(title) {
    const baseUrl = "/api/search/title/";
    const queryURL = baseUrl + title;
    console.log("GoogleBooks queryURL=\n", queryURL);
    return axios.get(queryURL);
  }
};
