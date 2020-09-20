import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

// import './Palette.css';

const styles = {
  footerContent: {
    height: "5vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "1rem",
    fontWeight: "bold",
    fontStyle: "italic"
  },
  paletteEmoji: {
    margin: "1rem",
    fontSize: "1.5rem"
  }
}
class PaletteFooter extends Component {
  render () {
    const { paletteName, paletteEmoji, classes } = this.props;
    return (
      <footer className="footer">
        <div className={classes.footerContent}>
          <span className="palette-name">{paletteName}</span>
          <span className={classes.paletteEmoji}>{paletteEmoji}</span>
        </div>
      </footer>
    )
  }
}

export default withStyles(styles)(PaletteFooter)
