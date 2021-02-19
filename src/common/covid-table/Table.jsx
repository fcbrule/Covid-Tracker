import React from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { insertCommasInNumbers, sortTable } from "../../utils/helpers";

import states from "../../utils/constant/states";

import { TableCell } from ".";

import "./Table.css";

class Table extends React.Component {
  state = { columnToSort: 0, ascending: true, rows: this.props.rows };

  shouldComponentUpdate(nextProps) {
    console.log(this.props.rows !== nextProps.rows);
    if (this.props.rows !== nextProps.rows) {
      this.setState({ rows: nextProps.rows });
    }
    return true;
  }

  // componentWillUpdate(nextProps) {
  //   if (this.props.rows !== nextProps.rows) {
  //     this.setState({ rows: nextProps.rows });
  //   }
  // }

  getTableCell(value, index) {
    if (Array.isArray(value)) {
      // if the table cell has 2 values put them in the necessary format
      return (
        <TableCell index={index}>
          <div
            className="cvt19cell-value-change"
            key={`cell ${value[0] * index + value[1]}`}
          >
            {value[1] === 0 || value[1] === undefined
              ? ""
              : `+${insertCommasInNumbers(value[1])}`}
          </div>
          {insertCommasInNumbers(value[0])}
        </TableCell>
      );
    } else {
      // if the table cell has 1 value
      return (
        <TableCell value={value} index={index} key={`cell ${value * index}`}>
          {insertCommasInNumbers(value)}
        </TableCell>
      );
    }
  }

  // arrow which describes the sorting in the columns
  renderSortingArrow = (index) => {
    const { columnToSort, ascending } = this.state;

    // if the column is not clicked
    if (index !== columnToSort) return "";

    if (ascending) return "▲";
    else return "▼";
  };

  handleColumnHeaderClick = (e, index) => {
    e.preventDefault();

    this.setState((previousState) => {
      return {
        columnToSort: index,
        ascending: !previousState.ascending,
        rows: sortTable(index, !previousState.ascending, previousState.rows),
      };
    });
  };

  renderTableHeaders() {
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
  handleLinkClick = (e) => {
    const { isLink } = this.props;

    if (!isLink) {
      e.preventDefault();
    } else {
      window.scrollTo(0, 0);
    }
  };

  getUrl(state) {
    if (state === "India") return "/";

    const stateCode = Object.keys(states).filter(
      (stateCode) => states[stateCode] === state
    );
    return `/state/${stateCode}`;
  }

  renderTableRows() {
    let { isLink } = this.props;

    const { rows } = this.state;

    // console.log(rows);

    return (
      <div>
        {rows.map((row, index) => (
          <Link
            className="cvt19table-row"
            to={this.getUrl(row[0])}
            onClick={(e) => this.handleLinkClick(e)}
            key={`row ${index}`}
            style={isLink ? null : { pointerEvents: "none" }}
          >
            {row.map((value) => (
              <div
                className="cvt19row-cell"
                // key={`state-${row[0]} ${
                //   (isNaN(value) ? value[0] + value[1] : value) * index
                // } ${index}`}
                key={Math.random()}
              >
                {this.getTableCell(value, index)}
              </div>
            ))}
          </Link>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderTableHeaders()}

        {this.renderTableRows()}
      </div>
    );
  }
}

export default Table;

Table.defaultProps = {
  rows: [],
  isLink: false,
  columnNames: [],
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array),
  columnNames: PropTypes.arrayOf(PropTypes.string),
  isLink: PropTypes.bool,
};
