export default {
    Palette: {
        height: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column"
    },
    PaletteColors: {
        height: "90%"
    },
    ColorBox: {
        width: "20%",
        height: props => props.showFullPalette ? "25%" : "50%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        cursor: "pointer",
        boxSizing: "border-box",
        marginBottom: "-4.5px"
    },
    backNavBox: {
        background: "black"
    },
    backButton: {
        backgroundColor: "rgb(255,255,255,0.3)",
        color: "white",
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
        "& a": {
            textDecoration: "none",
            color: "inherit"
        }
    }
}