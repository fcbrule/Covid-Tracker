import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import { connect } from "react-redux";

import SearchBar from "../../ui/search-bar";
import Navbar from "../../ui/navbar";

import { getAllSearchBarSuggestions } from "../../utils/helpers";

import webRoutes from "../../utils/router/webRoutes";

import StateDetails from "../../common/state-details";

import "./App.css";
// import { fetchStates } from "../../actions";

import { getCachedStatesData } from "../../utils/storage/getDataFromCache";
import Notifications from "./Notifications";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statesData: {},
      statesDataLoaded: false,
      error: {},
      errorDetected: false,
    };
  }
  componentDidMount = async () => {
    const statesData = await getCachedStatesData();

    if (statesData.name === "Error") {
      this.setState({ error: statesData, errorDetected: true });
    } else {
      this.setState({
        statesData,
        statesDataLoaded: true,
      });
    }
  };

  getNavbar() {
    return (
      <Navbar>
        <header className="cvt19app-header">Covid Tracker</header>

        <Notifications />
      </Navbar>
    );
  }

  getSearchBar() {
    const { statesData } = this.state;

    const locationsList = getAllSearchBarSuggestions(statesData);

    return (
      <div className="cvt19app-search-bar">
        Search for your district or state
        <SearchBar items={locationsList} />
      </div>
    );
  }

  getRoutes() {
    const { statesData } = this.state;

    return (
      <Switch>
        {Object.keys(webRoutes).map((route) => (
          <Route
            key={webRoutes[route]}
            path={webRoutes[route]}
            exact
            render={({ match }) => (
              <StateDetails statesData={statesData} match={match} />
            )}
          />
        ))}

        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    );
  }

  appBody() {
    const { statesDataLoaded } = this.state;

    if (!statesDataLoaded) return "Loading...";

    return (
      <Router>
        {this.getSearchBar()}

        {this.getRoutes()}
      </Router>
    );
  }

  handleError() {
    const { error } = this.state;
    return (
      <div className="cvt19app">
        {error.name} : {error.message}
      </div>
    );
  }

  render() {
    const { errorDetected } = this.state;

    if (errorDetected) {
      this.handleError();
    } else {
      return (
        <div className="cvt19app">
          <div className="cvt19app-navbar">{this.getNavbar()}</div>

          {this.appBody()}
        </div>
      );
    }
  }
}

// const mapStateToProps = (state) => {
//   console.log(state);
//   return { states: state.states };
// };

export default App;
// export default connect(null, { fetchStates })(App);
