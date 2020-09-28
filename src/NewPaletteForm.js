import React, { Component } from "react";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Typography from "@material-ui/core/Typography";

import ColorPickerForm from "./ColorPickerForm";
import DragableColorList from "./DragableColorList";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "./PaletteFormNav";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { arrayMove } from "react-sortable-hoc";
import { Divider } from "@material-ui/core";
const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  container: {
    display: "flex",
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  dragableColorBoxes: {
    height: "100%",
    width: "100%",
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors,
      paletteNameInput: "",
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  handleDrawerClose () {
    this.setState({
      open: false,
    });
  }
  handleDrawerOpen () {
    this.setState({
      open: true,
    });
  }
  handleChange (color, event) {
    this.setState({
      rgb: color.rgb,
      hex: color.hex,
    });

    console.log(color);
  }
  addNewColor (newColor) {
    // let newColor = {
    //   color: this.state.hex,
    //   name: this.state.colorInput,
    // };
    console.log(newColor);
    this.setState((state) => ({
      colors: [...state.colors, newColor],
    }));
  }
  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  // handleSubmit(newColor) {
  //   this.addNewColor(newColor);
  //   // this.setState({
  //   //   colorInput: "",
  //   // });
  // }
  handleDelete (colorName) {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== colorName),
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  savePalette (namePaletteName) {
    // let newName = this.state.paletteNameInput;
    let createdPalette = {
      paletteName: namePaletteName,
      id: namePaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "🎨",
      colors: this.state.colors,
    };
    this.props.savePalette(createdPalette);
    this.props.history.push("/");
  }
  clearPalette () {
    this.setState({
      colors: [],
    });
  }
  addRandomColor () {
    let random = (array) => array[Math.floor(Math.random() * array.length)];
    let randomPalette = random(this.props.palettes);
    let randomColor = random(randomPalette.colors);
    this.setState({
      colors: [...this.state.colors, randomColor],
    });
  }
  render () {
    let { open, colors } = this.state;
    let { classes, maxColors, palettes } = this.props;
    let paletteFullConditon = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          handleDrawerOpen={this.handleDrawerOpen}
          palettes={palettes}
          savePalette={this.savePalette}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >

          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {<ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            {/* <Typography variant="h4">Design your palette</Typography> */}

            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearPalette}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={paletteFullConditon && true}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm addNewColor={this.addNewColor} paletteFullConditon={paletteFullConditon} colors={colors} />
          </div>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
          style={{ background: this.state.rgb }}
        >
          <div className={classes.drawerHeader} />
          <div className={classes.dragableColorBoxes}>
            <DragableColorList
              colors={colors}
              handleDelete={this.handleDelete}
              axis="xy"
              onSortEnd={this.onSortEnd}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
