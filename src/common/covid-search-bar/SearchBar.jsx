import React from "react";

import { Link } from "react-router-dom";

import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "Search...", suggestions: [] };
  }

  //whenever text is changed update the suggestions array
  onTextChanged = (e) => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });

    let suggestions = [];
    if (searchTerm.length > 0) {
      const regex = new RegExp(`^${searchTerm}`, "i");
      suggestions = this.props.items.filter((item) => regex.test(item.name));
    }
    if (suggestions.length > 10) {
      suggestions = suggestions.slice(0, 10);
    }
    this.setState({ suggestions });
  };

  //reset search bar when suggestion is clicked
  handleSuggestionClick = (e) => {
    this.setState({ searchTerm: "", suggestions: [] });
  };

  //Clear the default text when search  bar is clicked
  handleSearchBarClick = (e) => {
    const { searchTerm } = this.state;
    if (searchTerm === "Search...") {
      this.setState({ searchTerm: "" });
    }
  };

  getURL(stateCode) {
    if (stateCode === "TT") return "/";
    return `/state/${stateCode}`;
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => (
          <Link
            to={this.getURL(item.code)}
            className="cvt19search-options"
            key={item.name}
          >
            <li onClick={this.handleSuggestionClick}>
              {item.name} <span>{item.code} &nbsp;▶</span>
            </li>
          </Link>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="cvt19search-bar">
        <input
          onClick={this.handleSearchBarClick}
          type="text"
          value={this.state.searchTerm}
          onChange={(e) => this.onTextChanged(e)}
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default SearchBar;
