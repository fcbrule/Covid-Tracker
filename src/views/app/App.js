import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import { connect } from "react-redux";

import SearchBar from "../../ui/search-bar";
import Navbar, { NavItem } from "../../ui/navbar";

import getAllSearchBarSuggestions from "../../utils/helpers/getAllSearchBarSuggestions";
import { ReactComponent as BellIcon } from "../../utils/icons/bell.svg";
import webRoutes from "../../utils/router/webRoutes";
import { getStatesData, getUpdatesLog } from "../../utils/api/statesData";
import formatUpdatesLog from "../../utils/helpers/formatUpdatesLog";

import StateDetails from "../state-details";
import DropdownMenu, { DropdownItem } from "../../ui/dropdown";

import "./App.css";
// import { fetchStates } from "../../actions";

import lscache from "lscache";
import {
  getCachedStatesData,
  getCachedUpdatesLog,
} from "../../utils/storage/getDataFromCache";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statesData: {},
      rows: [],
      updatesLog: [],
      statesDataLoaded: false,
      updatesLogLoaded: false,
    };
  }
  componentDidMount = async () => {
    // const statesData = lscache.get("statesData");
    // if (statesData !== null) {
    //   this.setState({ statesData, statesDataLoaded: true });
    // } else {
    //   await getStatesData().then((result) => {
    //     lscache.set("statesData", result.data, 60);
    //     this.setState({ statesData: result.data, statesDataLoaded: true });
    //   });
    // }

    // const updatesLog = lscache.get("updatesLog");
    // if (updatesLog !== null) {
    //   this.setState({ updatesLog, updatesLogLoaded: true });
    // } else {
    //   await getUpdatesLog().then((result) => {
    //     const formattedUpdatesLog = formatUpdatesLog(result.data);
    //     lscache.set("updatesLog", formattedUpdatesLog, 60);
    //     this.setState({
    //       updatesLog: formattedUpdatesLog,
    //       updatesLogLoaded: true,
    //     });
    //   });
    // }

    await getCachedStatesData().then((statesData) => {
      this.setState({ statesData, statesDataLoaded: true });
    });

    await getCachedUpdatesLog().then((updatesLog) => {
      this.setState({ updatesLog, updatesLogLoaded: true });
    });

    // const statesData = await getCachedStatesData().then((result) => result);
    // this.setState({ statesData, statesDataLoaded: true });

    // console.log(statesData);
    // await getCachedStatesData().then((statesData) => {
    //   console.log(statesData);
    //   this.setState({ statesData, statesDataLoaded: true });
    // });
  };

  getDropdown() {
    const { updatesLog, updatesLogLoaded } = this.state;

    // loading updates
    if (!updatesLogLoaded) return <DropdownMenu>Loading...</DropdownMenu>;

    if (Object.keys(updatesLog).length === 0) {
      return <DropdownMenu>No Updates</DropdownMenu>;
    } else {
      return (
        <DropdownMenu>
          {Object.keys(updatesLog).map((date) => (
            <div>
              <div className="cvt19notfication-date">{date}</div>
              {Object.keys(updatesLog[date]).map((relativeTime) => (
                <DropdownItem>
                  <div className="cvt19notfication-time">{relativeTime}</div>

                  {updatesLog[date][relativeTime].map((update) => (
                    <div className="cvt19notfication-text">{update}</div>
                  ))}
                </DropdownItem>
              ))}
            </div>
          ))}
        </DropdownMenu>
      );
    }
  }

  getNotificationsIcon() {
    return <NavItem icon={<BellIcon />}>{this.getDropdown()}</NavItem>;
  }

  getNavbar() {
    return (
      <Navbar>
        <header className="cvt19app-header">Covid Tracker</header>
        {this.getNotificationsIcon()}
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

  render() {
    return (
      <div className="cvt19app">
        <div className="cvt19app-navbar">{this.getNavbar()}</div>

        {this.appBody()}
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
