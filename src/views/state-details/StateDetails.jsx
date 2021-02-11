import React from "react";

import Table from "../../common/covid-table";

import getLocationStats from "../../utils/helpers/getLocationStats";
import getTableRows from "../../utils/helpers/getTableRows";
import states from "../../utils/constant/states";
import insertCommasInNumbers from "../../utils/helpers/insertCommasInNumber";
import CARD_STYLES from "../../utils/constant/cardStlyes";

import Card from "../../ui/card";

import "./StateDetails.css";

class StateDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stateCode: "TT" };
  }

  getStateCode() {
    const stateCode =
      this.props.match.params.stateCode === undefined
        ? "TT"
        : this.props.match.params.stateCode;

    return stateCode;
  }
  getCardData = (data) => {
    if (data === {}) return [];

    const stateCode = this.getStateCode();

    return getLocationStats(data, stateCode);
  };

  getTableRows = (data) => {
    if (data === {}) return [];

    const stateCode = this.getStateCode();

    return getTableRows(data, stateCode);
  };

  getTableColumnNames = () => {
    const stateCode = this.getStateCode();

    if (stateCode === "TT")
      return [
        "State/UT",
        "Confirmed",
        "Active",
        "Recovered",
        "Deceased",
        "Tested",
      ];
    else
      return [
        "District",
        "Confirmed",
        "Active",
        "Recovered",
        "Deceased",
        "Tested",
      ];
  };

  renderTable() {
    const { data, match } = this.props;

    const columnNames = this.getTableColumnNames();

    const rows = this.getTableRows(data);

    const isLink = columnNames[0] === "District";

    if (rows.length === 0)
      return <h1>No district data available for this state</h1>;
    return (
      <Table
        columnNames={columnNames}
        rows={rows}
        match={match}
        isLink={isLink}
      />
    );
  }

  renderHeading = () => {
    return `Details for ${states[this.getStateCode()]}`;
  };

  renderCards() {
    const { data } = this.props;

    const cardData = this.getCardData(data);

    return cardData.map((item) => (
      <Card style={CARD_STYLES[item.type]} key={item.type}>
        <p className="cvt19card-title">{item.type}</p>
        <p className="cvt19card-value-change">
          {item.change === undefined ? (
            <br />
          ) : (
            `+${insertCommasInNumbers(item.change)}`
          )}
        </p>
        <p className="cvt19card-value">{insertCommasInNumbers(item.count)}</p>
      </Card>
    ));
  }

  render() {
    if (states[this.getStateCode()] === undefined) {
      return <h1 className="cvt19heading">Invalid State Code</h1>;
    } else {
      return (
        <div>
          <h1 className="cvt19heading">{this.renderHeading()}</h1>

          <div className="cvt19details">{this.renderCards()}</div>

          <div className="cvt19table">{this.renderTable()}</div>
        </div>
      );
    }
  }
}

export default StateDetails;
