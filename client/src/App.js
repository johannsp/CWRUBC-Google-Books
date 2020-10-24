import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBook from "./pages/SearchBook";
import SavedBooks from "./pages/SavedBooks";
import NoMatch from "./pages/NoMatch";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path={["/", "/searchbook"]}>
            <SearchBook />
          </Route>
          <Route exact path="/savedbooks">
            <SavedBooks />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
