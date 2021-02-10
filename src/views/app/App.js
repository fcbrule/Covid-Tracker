import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import { connect } from "react-redux";

import SearchBar from "../../common/search-bar";
import Navbar, { NavItem } from "../../common/navbar";

import getAllSearchBarSuggestions from "../../utils/helpers/getAllSearchBarSuggestions";
import { ReactComponent as BellIcon } from "../../utils/icons/bell.svg";
import webRoutes from "../../utils/router/webRoutes";
import { getStatesData, getUpdates } from "../../utils/api/statesData";
import formatUpdatesLog from "../../utils/helpers/formatUpdatesLog";

import StateDetails from "../state-details";
import DropdownMenu, { DropdownItem } from "../../ui/dropdown";

import "./App.css";
// import { fetchStates } from "../../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { statesData: {}, rows: [], updatesLog: [] };
  }
  componentDidMount = async () => {
    this.props.fetchStates();
    await getStatesData().then((result) =>
      this.setState({ statesData: result.data })
    );

    await getUpdates().then((result) =>
      this.setState({ updatesLog: result.data })
    );
  };

  getRouter() {
    const { statesData } = this.state;

    const locationsList = getAllSearchBarSuggestions(statesData);

    return (
      <Router>
        <div className="cvt19app-search-bar">
          Search for your district or state
          <SearchBar items={locationsList} />
        </div>

        <Switch>
          {Object.keys(webRoutes).map((route) => (
            <Route
              key={webRoutes[route]}
              path={webRoutes[route]}
              exact
              render={({ match }) => (
                <StateDetails data={statesData} match={match} />
              )}
            />
          ))}

          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </Router>
    );
  }

  getDropdown(formattedUpdatesLog) {
    return (
      <DropdownMenu>
        {Object.keys(formattedUpdatesLog).map((date) => (
          <div>
            <div className="cvt19notfication-date">{date}</div>
            {Object.keys(formattedUpdatesLog[date]).map((relativeTime) => (
              <DropdownItem>
                <div className="cvt19notfication-time">{relativeTime}</div>

                {formattedUpdatesLog[date][relativeTime].map((update) => (
                  <div className="cvt19notfication-text">{update}</div>
                ))}
              </DropdownItem>
            ))}
          </div>
        ))}
      </DropdownMenu>
    );
  }

  getNotificationsIcon() {
    const { updatesLog } = this.state;

    const formattedUpdatesLog = formatUpdatesLog(updatesLog);

    if (formattedUpdatesLog === {}) return "";
    else {
      return (
        <NavItem icon={<BellIcon />}>
          {this.getDropdown(formattedUpdatesLog)}
        </NavItem>
      );
    }
  }

  getNavbar() {
    return (
      <Navbar>
        <header className="cvt19app-header">Covid Tracker</header>
        {this.getNotificationsIcon()}
      </Navbar>
    );
  }
  render() {
    console.log(this.props);
    return (
      <div className="cvt19app">
        <div className="cvt19app-navbar">{this.getNavbar()}</div>

        {this.getRouter()}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log(state);
//   return { states: state.states };
// };

export default App;
// export default connect(null, { fetchStates })(App);
