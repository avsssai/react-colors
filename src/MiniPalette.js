import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';

function MiniPalette (props) {
    const { classes, paletteName, emoji, colors, handlePaletteClick, id } = props;
    return (
        <div className={classes.root} onClick={() => handlePaletteClick(id)}>
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