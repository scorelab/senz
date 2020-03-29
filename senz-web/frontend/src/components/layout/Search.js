import React from "react";
import { withStyles } from "@material-ui/core/styles";
import _, { debounce } from 'lodash';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = theme => ({
});

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalArray: [],
            filtered: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];
        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.originalArray

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.name.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.originalArray;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }
    componentWillReceiveProps(nextProps) {
        const devices = nextProps.devices.map(function (e) {
            var obj = Object.assign({}, e);
            obj.type = "device";
            return obj;
        })
        const projects = nextProps.projects.map(function (e) {
            var obj = Object.assign({}, e);
            obj.type = "project";
            return obj;
        })
        this.setState({
            originalArray: [...devices, ...projects]
        });
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder="Search by title or author"
                />
            </div>
        )
    }
}
const styledSearch = withStyles(styles, { withTheme: true })(Search);

Search.propTypes = {
    projects: PropTypes.array,
    devices: PropTypes.array
};

export default connect(
    null,
    null
)(styledSearch);