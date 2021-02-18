import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";
import { fetchStates } from "../../store/states/statesActionCreators";

import SearchBar from "../../ui/search-bar";
import Navbar from "../../ui/navbar";

import { getAllSearchBarSuggestions, handleError } from "../../utils/helpers";

import webRoutes from "../../utils/router/webRoutes";

import StateDetails from "../../common/state-details";
import Notifications from "./Notifications";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statesData: {},
      statesDataLoaded: false,
      error: {},
    };
  }
  componentDidMount = async () => {
    this.props.fetchStates();
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
    const { states } = this.props;

    const locationsList = getAllSearchBarSuggestions(states);

    return (
      <div className="cvt19app-search-bar">
        Search for your district or state
        <SearchBar items={locationsList} />
      </div>
    );
  }

  getRoutes() {
    const { states } = this.props;

    return (
      <Switch>
        {Object.keys(webRoutes).map((route) => (
          <Route
            key={webRoutes[route]}
            path={webRoutes[route]}
            exact
            render={({ match }) => (
              <StateDetails statesData={states} match={match} />
            )}
          />
        ))}

        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    );
  }

  appBody() {
    return (
      <Router>
        {this.getSearchBar()}

        {this.getRoutes()}
      </Router>
    );
  }

  render() {
    const { isLoading, error, isEmpty } = this.props;

    if (Object.keys(error).length !== 0) {
      return handleError(error);
    } else if (isLoading) {
      return <p className="cvt19app">Loading...</p>;
    } else if (isEmpty) {
      return <p className="cvt19app">No data available at the moment...</p>;
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

const mapStateToProps = (state) => {
  const { isLoading, states, error } = state.statesReducer;

  const isEmpty = Object.keys(states).length === 0;

  return {
    isLoading,
    isEmpty,
    states,
    error,
  };
};

// export default App;
export default connect(mapStateToProps, { fetchStates })(App);
