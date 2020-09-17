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
    constructor(props){
        super(props);
        this.handlePaletteClick = this.handlePaletteClick.bind(this);
    }
    handlePaletteClick(id) {
        // console.log('hello');
        this.props.history.push(`/palette/${id}`)
    }
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
                                    <MiniPalette  {...palette} handlePaletteClick={this.handlePaletteClick} id={palette.id} key={palette.id}/>
                            )

                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
