import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends Component {
  constructor(props) {
    super(props);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
  }
  handleDialogOpen(e) {
    e.stopPropagation();
    this.props.handleDialogOpen(this.props.id);
  }
  render() {
    const {
      classes,
      paletteName,
      emoji,
      colors,
      handlePaletteClick,
      id,
    } = this.props;
    return (
      <div className={classes.root} onClick={() => handlePaletteClick(id)}>
        <div className={classes.colors}>
          {colors.map((color, i) => {
            return (
              <div
                className={classes.colorBox}
                style={{ backgroundColor: color.color }}
                key={color.name}
              ></div>
            );
          })}
        </div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
        <span>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.handleDialogOpen}
            style={{ transition: "all 0.3s ease-in-out" }}
          />
        </span>
      </div>
    );
  }
}
export default withStyles(styles)(MiniPalette);
