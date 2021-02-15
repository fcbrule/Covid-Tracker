import React from "react";

import { getCachedUpdatesLog } from "../../utils/storage/getDataFromCache";

import { ReactComponent as BellIcon } from "../../utils/icons/bell.svg";
import DropdownMenu, { DropdownItem } from "../../ui/dropdown";
import { NavItem } from "../../ui/navbar";

import "./Notifications.css";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatesLog: [],
      updatesLogLoaded: false,
      error: {},
      errorDetected: false,
    };
  }
  componentDidMount = async () => {
    const updatesLog = await getCachedUpdatesLog();

    if (updatesLog.name === "Error") {
      this.setState({ error: updatesLog, errorDetected: true });
    } else {
      this.setState({
        updatesLog,
        updatesLogLoaded: true,
      });
    }
  };

  getDropdown() {
    const { updatesLog, updatesLogLoaded } = this.state;

    // loading updates
    if (!updatesLogLoaded) {
      return <DropdownMenu>Loading...</DropdownMenu>;
    }

    if (Object.keys(updatesLog).length === 0) {
      return <DropdownMenu>No Updates</DropdownMenu>;
    } else {
      return (
        <DropdownMenu>
          {Object.keys(updatesLog).map((date) => (
            <div key={date}>
              <div className="cvt19notfication-date">{date}</div>
              {Object.keys(updatesLog[date]).map((relativeTime) => (
                <DropdownItem key={relativeTime}>
                  <div className="cvt19notfication-time">{relativeTime}</div>

                  {updatesLog[date][relativeTime].map((update) => (
                    <div className="cvt19notfication-text" key={`${update}`}>
                      {update}
                    </div>
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
      return this.getNotificationsIcon();
    }
  }
}

export default Notifications;
