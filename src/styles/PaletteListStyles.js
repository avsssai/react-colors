import sizes from "./sizes";

export default {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
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
      gridTemplateColumns: "repeat(1,80%)",
      gridGap: "1.5rem",
      margin: "auto",
      justifyContent: "center",
    },
  },
};
