import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from 'react-router-dom'
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import "./ColorBox.css";

const styles = {
  ColorBox: {
    width: "20%",
    height: props => props.showFullPalette ? "25%" : "50%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    boxSizing: "border-box",
    marginBottom: "-4.5px",
    "&:hover button": {
      opacity: "1"
    }
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0%",
    bottom: "0%",
    letterSpacing: "1px",
    color: props => chroma(props.background).luminance() >= 0.6 ? "black" : "white",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.1 ? "white" : "black"
  },
  seeMore: {
    backgroundColor: props => chroma(props.background).luminance() >= 0.6 ? "rgba(255, 255, 255, 0.3)" : "rgba(243,245,243,0.3)",
    color: props => chroma(props.background).luminance() <= 0.1 ? "white" : "black",
    position: " absolute",
    border: " none",
    bottom: "0%",
    right: "0%",
    width: " 60px",
    height: " 30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
    "& a": {
      textDecoration: "none",
      color: "inherit",
      fontSize: "14px"

    }
  },
  copyButton: {
    backgroundColor: props => chroma(props.background).luminance() >= 0.6 ? "rgba(255, 255, 255, 0.3)" : "rgba(243,245,243,0.3)",
    color: props => chroma(props.background).luminance() >= 0.6 ? "black" : "white",
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
    opacity: "0"
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.4s ease-in-out",
    transform: "scale(0.1)"
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute"

  },
  overlayText: {
    position: "fixed",
    left: "0",
    bottom: "0",
    top: "0",
    right: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    opacity: "0",
    transform: "scale(0.1)",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.3)",
      width: "100%",
      marginBottom: "0",
      padding: "1rem",

    },
    "& p": {
      fontWeight: "200",
      fontSize: "2rem"
    }
  },
  showOverlayText: {
    opacity: "1",
    zIndex: "15",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.1s",
    transform: "scale(1)",
    textAlign: "center"
  },
  copiedBanner: {
    color: props => chroma(props.background).luminance() >= 0.6 ? "black" : "white"
  },
}

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
            <h1 className={classes.copiedBanner}>COPIED!</h1>
            <p className={classes.copiedBanner}>{background}</p>
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