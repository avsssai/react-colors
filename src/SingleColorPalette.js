import React, { Component } from 'react'
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/core/styles';
import "./Palette.css";

let styles = {
    palette: {
        height: "100vh",
        diplay: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "hidden"
    },
    paletteColors: {
        height: "90vh"
    },
    ColorBox: {
        height: "50%",
        width: "20%"
    }

}

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorFormat: "hex"
        }
        this._getShades = this.generateShades(this.props.palette, this.props.id);
    }
    generateShades (palette, colorId) {
        let shades = [];
        let allColors = palette.colors;
        for (let i in allColors) {
            let shade = allColors[i].find(color => color.id === colorId);
            shades.push(shade);
        }
        console.log(shades.slice(1));
        return shades.slice(1);

    }
    render () {
        let { classes } = this.props;

        let colorBoxes = this._getShades.map(color => {
            return <ColorBox background={color[this.state.colorFormat]} name={color.name} key={color.name} showLink={false} className={classes.ColorBox} />
        })
        return (
            <div className={classes.palette}>
                <h1>Single Color palette</h1>
                <div className={classes.paletteColors}>
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);
