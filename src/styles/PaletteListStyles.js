import sizes from "./sizes";
import bg from "./bg.svg";

export default {
  root: {
    backgroundColor: "#ffff00",
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */

    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "scroll",
    overflowY: "auto",
    overflowX: "auto",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    [sizes.below("lg")]: {
      width: "80%",
    },
    [sizes.below("md")]: {
      width: "50%",
    },
    [sizes.below("sm")]: {
      width: "80%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "2.5rem",
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
    [sizes.below("md")]: {
      gridTemplateColumns: "repeat(2,50%)",
    },
    [sizes.below("xs")]: {
      gridTemplateColumns: "repeat(1,75%)",
      gridGap: "1.5rem",
      margin: "auto",
      justifyContent: "center",
    },
  },
  title: {
    [sizes.below("sm")]: {
      fontSize: "2rem",
    },
  },
};
