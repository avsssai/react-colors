import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/core/styles";
// import "./Palette.css";

let styles = {
  palette: {
    height: "100vh",
    diplay: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  paletteColors: {
    height: "90vh",
  },
  ColorBox: {
    height: "50%",
    width: "20%",
  },
};

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorFormat: "hex",
      snackbarOpen: false,
    };
    this._getShades = this.generateShades(this.props.palette, this.props.id);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }
  generateShades(palette, colorId) {
    let shades = [];
    let allColors = palette.colors;
    for (let i in allColors) {
      let shade = allColors[i].find((color) => color.id === colorId);
      shades.push(shade);
    }
    console.log(shades.slice(1));
    return shades.slice(1);
  }
  handleChange(format) {
    this.setState({
      colorFormat: format,
      snackbarOpen: true,
    });
  }
  handleSnackbarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }
  render() {
    let { classes } = this.props;
    let {paletteName, emoji} = this.props.palette;
    let colorBoxes = this._getShades.map((color) => {
      return (
        <ColorBox
          background={color[this.state.colorFormat]}
          name={color.name}
          key={color.name}
          showLink={false}
          className={classes.ColorBox}
        />
      );
    });
    return (
      <div className={classes.palette}>
        <NavBar
          showingSlider={false}
          handleChange={this.handleChange}
          snackbarOpen={this.state.snackbarOpen}
          handleSnackbarClose={this.handleSnackbarClose}
          handleClose={this.handleSnackbarClose}
        />
        <div className={classes.paletteColors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} paletteEmoji={emoji}/>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
