export default {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "1px solid black",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: "1",
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "100px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  colorBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-5.5px",
  },
  title: {
    display: "flex",
    margin: "0",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "0.75rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  deleteIcon: {
    position: "absolute",
    right: "0",
    top: "0",
    opacity: "0",
    height: "20px",
    width: "20px",
    padding: "2px",
    background: "#eb3d30",
    color: "white",
  },
};
