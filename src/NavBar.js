import React, { Component } from "react";
import Slider from "rc-slider";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "rc-slider/assets/index.css";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { withStyles } from "@material-ui/styles";

import styles from './styles/NavbarStyles';
// import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorFormat: "hex",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (e) {
    this.setState({
      colorFormat: e.target.value,
    });
    console.log(e.target.value);
    this.props.handleChange(e.target.value);
  }
  render () {
    const {
      level,
      handleOnAfterChange,
      handleClose,
      handleSnackbarClose,
      snackbarOpen,
      showingSlider,
      classes
    } = this.props;
    const { colorFormat } = this.state;
    return (
      <nav className={classes.Navbar}>
        <Link to="/">
          <div className={classes.logo}>reactcolorpicker</div>
        </Link>
        {showingSlider && (
          <div className="slider-container">
            <span className={classes.level}>Level {level}</span>

            <div className={classes.slider}>
              <Slider
                min={100}
                max={900}
                defaultValue={level}
                onAfterChange={handleOnAfterChange}
                step={100}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select onChange={this.handleChange} value={colorFormat}>
            <MenuItem value="hex">Hex - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - (255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - (255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={4000}
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          message={`Format changed to ${colorFormat.toUpperCase()}`}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </nav>
    );
  }
}

export default withStyles(styles)(NavBar);