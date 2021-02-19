import React from "react";

import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./SearchBar.css";
import { withRouter } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "Search...", suggestions: [], cursor: 0 };
  }

  //whenever text is changed update the suggestions array
  onTextChanged = (e) => {
    const { items } = this.props;

    const searchTerm = e.target.value;

    this.setState({ searchTerm });

    let suggestions = [];
    if (searchTerm.length > 0) {
      const regex = new RegExp(`^${searchTerm}`, "i");

      suggestions = items.filter((item) => regex.test(item.title));
    }
    if (suggestions.length > 10) {
      suggestions = suggestions.slice(0, 10);
    }
    this.setState({ suggestions });
  };

  handleSuggestionSelected = (link) => {
    const { history } = this.props;

    //reset search bar when suggestion is clicked
    this.setState({ searchTerm: "", suggestions: [] });

    // <Redirect to={link} />;

    history.push(link);
    // window.location.reload();
  };

  //Clear the default text when search  bar is clicked
  handleSearchBarClick = (e) => {
    const { searchTerm } = this.state;
    if (searchTerm === "Search...") {
      this.setState({ searchTerm: "" });
    }
  };

  renderSuggestions() {
    const { suggestions, cursor } = this.state;
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <ul>
        {suggestions.map((item, index) => (
          <Link
            to={item.link}
            // className="cvt19search-options"
            className={`cvt19search-options ${
              index === cursor ? "cvt19search-options-active" : ""
            }`}
            key={item.title}
          >
            <li onClick={() => this.handleSuggestionSelected(item.link)}>
              {item.title}
              <div className="cvt19search-options-adornment">
                {item.adornment}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    );
  }

  handleKeyDown = (key) => {
    const { cursor, suggestions } = this.state;

    // up key
    if (key.keyCode === 38 && cursor > 0) {
      this.setState((previousState) => ({
        cursor: previousState.cursor - 1,
      }));
    }
    // down key
    else if (key.keyCode === 40 && cursor < suggestions.length - 1) {
      this.setState((previousState) => ({
        cursor: previousState.cursor + 1,
      }));
    }
    //enter key
    else if (key.keyCode === 13) {
      const link = suggestions[cursor].link;

      this.handleSuggestionSelected(link);
    }
  };

  render() {
    return (
      <div className="cvt19search-bar">
        <input
          onKeyDown={this.handleKeyDown}
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

export default withRouter(SearchBar);

SearchBar.defaultProps = {
  items: [],
};

SearchBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
    })
  ),
};
