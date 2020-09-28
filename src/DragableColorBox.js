import React from "react";
import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/DraggableColorBoxStyles";

const DragableColorBox = SortableElement((props) => {
  const { classes, color } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color.color }}>
      <div className={classes.boxContent}>
        <span> {color.name}</span>
        <span>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={props.handleDelete}
          />
        </span>
      </div>
    </div>
  );
});

export default withStyles(styles)(DragableColorBox);
