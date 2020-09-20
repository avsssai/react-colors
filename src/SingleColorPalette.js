import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./Palette.css";

const styles = {
  Palette: {
    height: "100vh",
    overflowX: "hidden",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  PaletteColors: {
    height: "90%"
  },
  ColorBox: {
    width: "20%",
    height: props => props.showFullPalette ? "25%" : "50%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    boxSizing: "border-box",
    marginBottom: "-4.5px"
  },
  backNavBox: {
    background: "black"
  },
  backButton: {
    backgroundColor: "rgb(255,255,255,0.3)",
    color: "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "20px",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    "& a": {
      textDecoration: "none",
      color: "inherit"
    }
  }
}


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
  generateShades (palette, colorId) {
    let shades = [];
    let allColors = palette.colors;
    for (let i in allColors) {
      let shade = allColors[i].find((color) => color.id === colorId);
      shades.push(shade);
    }
    console.log(shades.slice(1));
    return shades.slice(1);
  }
  handleChange (format) {
    this.setState({
      colorFormat: format,
      snackbarOpen: true,
    });
  }
  handleSnackbarClose () {
    this.setState({
      snackbarOpen: false,
    });
  }
  render () {
    let { classes } = this.props;
    let { paletteName, emoji, id } = this.props.palette;
    let colorBoxes = this._getShades.map((color) => {
      return (
        <ColorBox
          background={color[this.state.colorFormat]}
          name={color.name}
          key={color.name}
          showLink={false}
        />
      );
    });
    return (
      <div className={classes.Palette}>
        <NavBar
          showingSlider={false}
          handleChange={this.handleChange}
          snackbarOpen={this.state.snackbarOpen}
          handleSnackbarClose={this.handleSnackbarClose}
          handleClose={this.handleSnackbarClose}
        />
        <div className={classes.PaletteColors}>
          {colorBoxes}
          <div className={`${classes.backNavBox} ${classes.ColorBox}`}>
            <Link to={`/palette/${id}`}>
              <button className={classes.backButton}>Go Back</button>
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} paletteEmoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
// export default SingleColorPalette;
