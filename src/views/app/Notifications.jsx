import React from "react";

import { ReactComponent as BellIcon } from "../../utils/icons/bell.svg";
import DropdownMenu, { DropdownItem } from "../../ui/dropdown";
import { NavItem } from "../../ui/navbar";

import { connect } from "react-redux";

import "./Notifications.css";

import { fetchUpdates } from "../../store/updates/updatesActionCreators";

import { handleError } from "../../utils/helpers";

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
    this.props.fetchUpdates();
  };

  renderUpdates() {
    const { updates } = this.props;

    return Object.keys(updates).map((date) => (
      <div key={date}>
        <div className="cvt19notfication-date">{date}</div>

        {Object.keys(updates[date]).map((relativeTime) => (
          <DropdownItem key={relativeTime}>
            <div className="cvt19notfication-time">{relativeTime}</div>

            {updates[date][relativeTime].map((update) => (
              <div className="cvt19notfication-text" key={`${update}`}>
                {update}
              </div>
            ))}
          </DropdownItem>
        ))}
      </div>
    ));
  }

  fetchU;

  getDropdownBody() {
    const { isLoading, error, isEmpty } = this.props;

    if (Object.keys(error).length !== 0) {
      return <div className="cvt19notfication-date">{handleError(error)}</div>;
    } else if (isLoading) {
      return <div className="cvt19notfication-date">Loading...</div>;
    } else if (isEmpty) {
      return <div className="cvt19notfication-date">No Updates</div>;
    } else {
      return this.renderUpdates();
    }
  }

  getNotificationsIcon() {
    return (
      <NavItem icon={<BellIcon />}>
        <DropdownMenu>{this.getDropdownBody()}</DropdownMenu>
      </NavItem>
    );
  }

  render() {
    return this.getNotificationsIcon();
  }
}

const mapStateToProps = (state) => {
  const { isLoading, updates, error } = state.updatesReducer;

  const isEmpty = updates.length === 0;

  return {
    isLoading,
    isEmpty,
    updates,
    error,
  };
};

export default connect(mapStateToProps, { fetchUpdates })(Notifications);
