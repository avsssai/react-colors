import sizes from "./sizes";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    boxSizing: "border-box",
    marginBottom: "-6.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.2)",
    },
    [sizes.below("lg")]: {
      width: "25%",
      height: "20%",
    },
    [sizes.below("md")]: {
      width: "50%",
      height: "10%",
    },
    [sizes.below("sm")]: {
      width: "100%",
      height: "5%",
    },
  },
  boxContent: {
    position: "absolute",
    display: "Flex",
    justifyContent: "space-between",
    padding: "10px",
    width: "100%",
    left: "0%",
    bottom: "0%",
    letterSpacing: "1px",
    // color: props => chroma(props.background).luminance() >= 0.6 ? "black" : "white",
    color: "black",
    textTransform: "uppercase",
    fontSize: "12px",

    color: "rgba(0,0,0,0.5)",
    [sizes.below("sm")]: {
      padding: "0 10px",
    },
  },
  deleteIcon: {
    transition: "all 0.2s ease-in-out",
  },
};

export default styles;
