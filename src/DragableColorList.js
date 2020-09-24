import React from "react";
import DragableColorBox from './DragableColorBox';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import {withStyles} from '@material-ui/styles';

const styles = {
    dragableColorBoxes: {
        height: "100%",
        width: "100%",
      }
}

const DragableColorList= SortableContainer((props) => {
    const {classes} = props;
    
  return (
    <div className={classes.dragableColorBoxes}>
      {props.colors.map((color,index) => {
        return (
          <DragableColorBox
            color={color}
            key={color.name}
            index={index}
            handleDelete={() => props.handleDelete(color.name)}
            
          />
        );
      })}
    </div>
  );
})

export default withStyles(styles)(DragableColorList) ;