import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteStyles";

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
    const { classes } = this.props;
    const { colorFormat } = this.state;
    let { paletteName, emoji, id } = this.props.palette;
    let colorBoxes = this._getShades.map((color) => {
      return (
        <ColorBox
          background={color[colorFormat]}
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
          <div className={`${classes.backNavBox} `}>
            <Link to={`/palette/${id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} paletteEmoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
// export default SingleColorPalette;
