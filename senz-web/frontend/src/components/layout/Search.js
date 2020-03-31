import React from "react";
import { withStyles } from "@material-ui/core/styles";
import _, { debounce } from 'lodash';
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom'
import PropTypes from "prop-types";
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Chip from '@material-ui/core/Chip';
import { setProjectAction } from '../../_actions/project'

const styles = theme => ({
    search: {
        width: '40vw',
        height: '3rem',
        marginLeft: '5vw'
    },
    list: {
        position: 'absolute',
        marginLeft: '5vw',
        width: '40vw',
        marginTop: '0.5rem',
    },
    project: {
        marginBottom: '0.05rem',
        background: '#00a8cc',
        color: 'black'
    },
    device: {
        marginBottom: '0.05rem',
        background: '#18b0b0',
        color: 'black'
    }
});

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalArray: [],
            filtered: [],
            showlist: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleChange(e) {
        this.setState({
            showlist: true,
        })
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
            this.setState({
                showlist: false,
            })
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
            originalArray: [...projects, ...devices]
        });
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                showlist: false
            })
        }
    }

    render() {
        const { classes } = this.props;
        const list = this.state.filtered
        const { token } = this.props.user
        return (
            <div ref={this.setWrapperRef}>
                <FormControl fullWidth variant="filled" className={classes.search}>
                    <FilledInput
                        id="outlined-adornment-amount"
                        value={this.state.query}
                        onChange={this.handleChange}
                        placeholder="Search by project or device"
                    />
                </FormControl>
                {
                    this.state.showlist ? <div className={classes.list}>
                        {
                            list.map((item) =>
                                item.type === 'project' ?
                                    <SnackbarContent
                                        message={
                                            item.name
                                        }
                                        onClick={() => {
                                            this.props.setProjectAction(item._id, token);
                                            return window.location.href = process.env.API_HOST + process.env.REACT_APP_PORT + `/home`
                                        }}
                                        className={classes.project}
                                        action={<Chip label={item.type} />}
                                    >

                                    </SnackbarContent> :
                                    <SnackbarContent
                                        message={
                                            item.name
                                        }
                                        onClick={() => {
                                            return window.location.href = process.env.API_HOST + process.env.REACT_APP_PORT + `/allDevice`
                                        }}
                                        className={classes.device}
                                        action={<Chip label={item.type} />}
                                    >
                                    </SnackbarContent>

                            )
                        }
                    </div> : null}
            </div>
        )
    }
}
const styledSearch = withStyles(styles, { withTheme: true })(Search);

Search.propTypes = {
    projects: PropTypes.array,
    devices: PropTypes.array,
    user: PropTypes.array
};

export default connect(
    null,
    { setProjectAction }
)(styledSearch);


