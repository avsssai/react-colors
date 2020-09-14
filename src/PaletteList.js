import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,30%)",
        gridGap: "5%",
        "& a": {
            textDecoration: "none",
            color: "inherit"
        }
    }
}

class PaletteList extends Component {
    render () {

        let { palettes, classes } = this.props;
        return (

            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>

                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map((palette, i) => {
                            return (
                                <Link to={`/palette/${palette.id}`}>
                                    <MiniPalette  {...palette} />
                                </Link>
                            )

                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
