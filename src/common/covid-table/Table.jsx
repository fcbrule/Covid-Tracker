import React from "react";

import { Link } from "react-router-dom";

import insertCommasInNumbers from "../../utils/helpers/insertCommasInNumber";
import sortTable from "../../utils/helpers/sortTable";
import states from "../../utils/constant/states";

import { TableCell } from "./";

import "./Table.css";

class Table extends React.Component {
  state = { columnToSort: 0, ascending: true };
  getTableCell(value, index) {
    if (Array.isArray(value)) {
      return (
        <TableCell value={value} index={index}>
          <div className="cvt19cell-value-change">
            {value[1] === 0 || value[1] === undefined
              ? ""
              : `+${insertCommasInNumbers(value[1])}`}
          </div>
          {insertCommasInNumbers(value[0])}
        </TableCell>
      );
    } else {
      return (
        <TableCell value={value} index={index}>
          {insertCommasInNumbers(value)}
        </TableCell>
      );
    }
  }

  renderSortingArrow = (index) => {
    const { columnToSort, ascending } = this.state;

    if (index !== columnToSort) return "";
    console.log(index);
    if (ascending) return "▲";
    else return "▼";
  };

  handleLinkClick = (e) => {
    const { isLink } = this.props;

    if (isLink) {
      e.preventDefault();
    } else {
      window.scrollTo(0, 0);
    }
  };

  getURL(state) {
    if (state === "India") return "/";

    const stateCode = Object.keys(states).filter(
      (stateCode) => states[stateCode] === state
    );
    return `/state/${stateCode}`;
  }

  getTableRows() {
    let { rows, isLink } = this.props;
    const { columnToSort, ascending } = this.state;
    rows = sortTable(columnToSort, ascending, rows);
    return (
      <div>
        {rows.map((row, index) => (
          <Link
            className="cvt19table-row"
            to={this.getURL(row[0])}
            onClick={(e) => this.handleLinkClick(e)}
            key={`row ${index}`}
            style={isLink ? { pointerEvents: "none" } : null}
          >
            {row.map((value) => (
              <div className="cvt19row-cell" key={Math.random()}>
                {this.getTableCell(value, index)}
              </div>
            ))}
          </Link>
        ))}
      </div>
    );
  }

  handleColumnHeaderClick = (e, index) => {
    e.preventDefault();
    const { ascending } = this.state;
    this.setState({ columnToSort: index, ascending: !ascending });
  };

  getTableHeaders() {
    const { columnNames } = this.props;

    return (
      <div className="cvt19table-headers">
        {columnNames.map((name, index) => (
          <div
            className="cvt19table-headers-cell"
            onClick={(e) => this.handleColumnHeaderClick(e, index)}
            key={name}
          >
            <TableCell key={name}>
              {this.renderSortingArrow(index)}
              {name}
            </TableCell>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.getTableHeaders()}

        {this.getTableRows()}
      </div>
    );
  }
}

export default Table;
