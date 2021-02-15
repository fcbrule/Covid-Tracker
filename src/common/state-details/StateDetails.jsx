import React from "react";

import Table from "../covid-table";

import {
  getLocationStats,
  getTableRows,
  insertCommasInNumbers,
} from "../../utils/helpers/";

import states from "../../utils/constant/states";
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

  getHeading = () => {
    return `Details for ${states[this.getStateCode()]}`;
  };

  getCardData = (statesData) => {
    if (Object.keys(statesData).length === 0) return [];

    const stateCode = this.getStateCode();

    return getLocationStats(statesData, stateCode);
  };

  getCards() {
    const { statesData } = this.props;

    const cardData = this.getCardData(statesData);

    return cardData.map((item) => (
      <Card
        backgroundColor={CARD_STYLES[item.type].backgroundColor}
        key={item.type}
      >
        <p className="cvt19card-title" key={item.type}>
          {item.type}
        </p>
        <p className="cvt19card-value-change" key={item.change}>
          {item.change === undefined ? (
            <br />
          ) : (
            `+${insertCommasInNumbers(item.change)}`
          )}
        </p>
        <p className="cvt19card-value" key={item.count}>
          {insertCommasInNumbers(item.count)}
        </p>
      </Card>
    ));
  }

  getTableColumnNames = () => {
    const stateCode = this.getStateCode();

    return [
      stateCode === "TT" ? "State/UT" : "District",
      "Confirmed",
      "Active",
      "Recovered",
      "Deceased",
      "Tested",
    ];
  };

  getTableRows = (statesData) => {
    if (Object.keys(statesData) === 0) return [];

    const stateCode = this.getStateCode();

    return getTableRows(statesData, stateCode);
  };

  getTable() {
    const { statesData, match } = this.props;

    const columnNames = this.getTableColumnNames();

    const rows = this.getTableRows(statesData);

    const isLink = columnNames[0] !== "District"; // if table row is link or not

    if (rows.length === 0)
      return <h1>Sorry . . . No district data available</h1>;
    return (
      <Table
        columnNames={columnNames}
        rows={rows}
        match={match}
        isLink={isLink}
      />
    );
  }

  render() {
    if (states[this.getStateCode()] === undefined) {
      return <h1 className="cvt19heading">Invalid State Code</h1>;
    } else {
      return (
        <div>
          <h1 className="cvt19heading">{this.getHeading()}</h1>

          <div className="cvt19details">{this.getCards()}</div>

          <div className="cvt19table">{this.getTable()}</div>
        </div>
      );
    }
  }
}

export default StateDetails;
