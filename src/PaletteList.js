import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.handlePaletteClick = this.handlePaletteClick.bind(this);
    }
    handlePaletteClick (id) {
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
                        <div>

                            <Link to={'/palette/new'}>Create Palette</Link>
                        </div>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map((palette, i) => {
                            return (
                                <MiniPalette  {...palette} handlePaletteClick={this.handlePaletteClick} id={palette.id} key={palette.id} />
                            )

                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
