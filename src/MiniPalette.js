import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: "white",
        borderRadius: "5px",
        border: "1px solid black",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidder",
        "&:hover": {
            cursor: "pointer"
        },
    },
    colors: {
        backgroundColor: "#dae1e4",
        height: "100px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    colorBox: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
    },
    title: {
        display: "flex",
        margin: "0",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "0.75rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    }
}
function MiniPalette (props) {
    const { classes, paletteName, emoji, colors } = props;
    return (
        <div className={classes.root}>
            <div className={classes.colors}>
                {colors.map((color, i) => {
                    return <div className={classes.colorBox} style={{ backgroundColor: color.color }} key={color.name}></div>
                })}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}
export default withStyles(styles)(MiniPalette);