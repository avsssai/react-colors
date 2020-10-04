import chroma from "chroma-js";
import sizes from "./sizes";

export default {
  ColorBox: {
    width: "20%",
    height: (props) => (props.showFullPalette ? "25%" : "50%"),
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    boxSizing: "border-box",
    marginBottom: "-5.5px",
    "&:hover button": {
      opacity: "1",
    },
    [sizes.below("lg")]: {
      width: "25%",
      height: (props) => (props.showFullPalette ? "20%" : "33.33%"),
    },
    [sizes.below("md")]: {
      width: "50%",
      height: (props) => (props.showFullPalette ? "10%" : "20%"),
    },
    [sizes.below("xs")]: {
      width: "100%",
      height: (props) => (props.showFullPalette ? "5%" : "10%"),
    },
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0%",
    bottom: "0%",
    letterSpacing: "1px",
    color: (props) =>
      chroma(props.background).luminance() >= 0.6 ? "black" : "white",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.1 ? "white" : "black",
  },
  seeMore: {
    backgroundColor: (props) =>
      chroma(props.background).luminance() >= 0.6
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(243,245,243,0.3)",
    color: (props) =>
      chroma(props.background).luminance() <= 0.1 ? "white" : "black",
    position: "absolute",
    border: "none",
    bottom: "0%",
    right: "0%",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
    "& a": {
      textDecoration: "none",
      color: "inherit",
      fontSize: "14px",
    },
  },
  copyButton: {
    backgroundColor: (props) =>
      chroma(props.background).luminance() >= 0.6
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(243,245,243,0.3)",
    color: (props) =>
      chroma(props.background).luminance() >= 0.6 ? "black" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    outline: "none",
    // backgroundColor: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "20px",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    opacity: "0",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.4s ease-in-out",
    transform: "scale(0.1)",
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  overlayText: {
    position: "fixed",
    zIndex: "-10",
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
      zIndex: "-1",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.3)",
      width: "100%",
      marginBottom: "0",
      padding: "1rem",
      color: (props) =>
        chroma(props.background).luminance() >= 0.6 ? "black" : "white",
      [sizes.below("xs")]: {
        fontSize: "3rem",
      },
    },
    "& p": {
      fontWeight: "200",
      zIndex: "-1",
      fontSize: "2rem",
      color: (props) =>
        chroma(props.background).luminance() >= 0.6 ? "black" : "white",
    },
  },
  showOverlayText: {
    opacity: "1",
    // display:"block"
    zIndex: "15",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.1s",
    transform: "scale(1)",
    textAlign: "center",
  },
};
