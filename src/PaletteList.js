import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false,
    };
    this.handlePaletteClick = this.handlePaletteClick.bind(this);
    this.handlePaletteDelete = this.handlePaletteDelete.bind(this);
  }
  handlePaletteClick(id) {
    // console.log('hello');
    this.props.history.push(`/palette/${id}`);
  }
  handlePaletteDelete(paletteId) {
    this.props.handlePaletteDelete(paletteId);
  }
  render() {
    let { palettes, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className="title">React Colors</h1>
            <div>
              <Link to={"/palette/new"}>Create Palette</Link>
            </div>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette, i) => {
              return (
                <CSSTransition timeout={500} key={palette.id} classNames="fade">
                  <MiniPalette
                    {...palette}
                    handlePaletteClick={this.handlePaletteClick}
                    id={palette.id}
                    key={palette.id}
                    handleDelete={this.handlePaletteDelete}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
