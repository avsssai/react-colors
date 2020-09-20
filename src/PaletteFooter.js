import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteFooterStyles';

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
