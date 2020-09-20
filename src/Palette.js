import React, { Component } from "react";
import NavBar from "./NavBar";
import ColorBox from "./ColorBox";
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';

import styles from './styles/PaletteStyles';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      colorFormat: "hex",
      snackbarOpen: false,
    };
    this.handleOnAfterChange = this.handleOnAfterChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }
  handleOnAfterChange (level) {
    this.setState({ level });
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
    const { palette, classes } = this.props;
    let { level, colorFormat } = this.state;
    console.log(this.state.level);
    return (
      <div>
        {/* Header/Nav component goes here */}
        <div className={classes.Palette}>
          <NavBar
            level={level}
            handleOnAfterChange={this.handleOnAfterChange}
            colorFormat={colorFormat}
            handleChange={this.handleChange}
            showingSlider
            handleClose={this.handleSnackbarClose}
            handleSnackbarClose={this.handleSnackbarClose}
            snackbarOpen={this.state.snackbarOpen}
          />
          <div className={classes.PaletteColors}>
            {palette.colors[level].map((color, i) => {
              return (
                <ColorBox
                  background={color[colorFormat]}
                  name={color.name}
                  key={i}
                  id={color.id}
                  moreUrl={`/palette/${palette.id}/${color.id}`}
                  showFullPalette
                  generateShades={this.generateShades}
                />
              );
            })}
          </div>


          <PaletteFooter paletteName={palette.paletteName} paletteEmoji={palette.emoji} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Palette);