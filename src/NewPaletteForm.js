import React, { Component } from "react";

import DragableColorBox from "./DragableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";

import { withStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
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
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      hex: "#712626",
      hsl: { h: 0, s: 0.49499177754522344, l: 0.29592136, a: 1 },
      hsv: { h: 0, s: 0.6621999999999999, v: 0.4424, a: 1 },
      oldHue: 0,
      rgb: { r: 113, g: 38, b: 38, a: 1 },
      colors: [
        { name: "lightblue", color: "lightblue" },
        { name: "Crazy Red", color: "#e13433" },
      ],
      colorInput: "",
      paletteNameInput: "",
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      if (
        this.state.colors.some(
          (color) => color.name.toLowerCase() === value.toLowerCase()
        )
      ) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      if (this.state.colors.some((color) => color.color === this.state.hex)) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique",(value)=>{
      if(this.props.palettes.every(palette => palette.paletteName.toLowerCase() !== value.toLowerCase() )){
        return true
      }
      return false;
    })
  }

  handleDrawerClose() {
    this.setState({
      open: false,
    });
  }
  handleDrawerOpen() {
    this.setState({
      open: true,
    });
  }
  handleChange(color, event) {
    this.setState({
      rgb: color.rgb,
      hex: color.hex,
    });

    console.log(color);
  }
  addNewColor() {
    let newColor = {
      color: this.state.hex,
      name: this.state.colorInput,
    };
    this.setState((state) => ({
      colors: [...state.colors, newColor],
    }));
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    this.addNewColor();
    this.setState({
      colorInput: "",
    });
  }

  savePalette() {
    let newName = this.state.paletteNameInput;
    let createdPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      emoji: "🎨",
      colors: this.state.colors,
    };
    this.props.savePalette(createdPalette);
    this.props.history.push("/");
  }
  render() {
    let { open, hex, colorInput, paletteNameInput } = this.state;
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>

            <ValidatorForm
              onSubmit={this.savePalette}
              onError={(error) => console.log(error)}
              ref="form"
            >
              <TextValidator
                label="Palette Name"
                onChange={this.handleInputChange}
                validators={["required", "isPaletteNameUnique"]}
                value={paletteNameInput}
                name="paletteNameInput"
                errorMessages={[
                  "Every Palette needs a name!",
                  "This palette name already exists.",
                ]}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
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
          <div>
            <Button variant="contained" color="secondary">
              Clear Palette
            </Button>
            <Button variant="contained" color="primary">
              Random Color
            </Button>
          </div>

          <Typography variant="h4">Design your palette</Typography>

          <ChromePicker
            color={this.state.rgb}
            onChangeComplete={this.handleChange}
          />
          <ValidatorForm
            onSubmit={this.handleSubmit}
            onError={(error) => console.log(error)}
            ref="form"
          >
            <TextValidator
              label="New Color"
              onChange={this.handleInputChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              value={colorInput}
              name="colorInput"
              errorMessages={[
                "Every color needs a name!",
                "This color name already exists.",
                "This color already exists.",
              ]}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ backgroundColor: `${this.state.hex}` }}
              // onClick={this.addNewColor}
              type="submit"
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
          style={{ background: this.state.rgb }}
        >
          <div className={classes.drawerHeader} />
          <div className={classes.dragableColorBoxes}>
            {this.state.colors.map((color) => {
              return <DragableColorBox color={color} key={color.name} />;
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
