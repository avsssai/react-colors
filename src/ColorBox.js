import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';


class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
    this.changeCopyState = this.changeCopyState.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }
  changeCopyState () {
    this.setState(
      {
        copied: true,
      },
      () => {
        setTimeout(() => this.setState({ copied: false }), 1500);
      }
    );

  }

  handleMoreClick (e) {
    e.stopPropagation();
  }

  render () {
    const { background, name, moreUrl, showFullPalette, classes } = this.props;
    let { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.ColorBox} style={{ backgroundColor: background }}>
          <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} style={{ background }}></div>
          <div className={`${classes.overlayText} ${copied && classes.showOverlayText}`} >
            <h1>COPIED!</h1>
            <p>{background}</p>
          </div>
          <div className="copy-content">
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton} >Copy</button>
            {showFullPalette && (
              <div className={classes.seeMore} >

                <Link to={moreUrl} onClick={this.handleMoreClick}  >
                  More
              </Link>
              </div>

            )}

          </div>
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);