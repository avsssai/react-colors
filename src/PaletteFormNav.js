import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import PaletteMetaForm from "./PaletteMetaForm";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteFormNavStyles";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEmojiPicker: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.dialogOpen = this.dialogOpen.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      paletteNameInput: e.target.value,
    });
  }

  savePalette(paletteName) {
    this.props.savePalette(paletteName);
  }
  dialogOpen() {
    this.setState({
      open: true,
    });
  }
  handleClose() {
    this.setState({
      open: false,
    });
  }
  render() {
    const { classes, open, palettes } = this.props;
    // const { paletteNameInput } = this.state;
    return (
      <div className="root">
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
              onClick={this.props.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap>
              Create a Palette
            </Typography>
          </Toolbar>

          <div className={classes.buttons}>
            <Link to="/" className={classes.link}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              onClick={this.dialogOpen}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Save Palette
            </Button>
          </div>
        </AppBar>
        {this.state.open && (
          <PaletteMetaForm
            savePalette={this.savePalette}
            palettes={palettes}
            handleClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PaletteFormNav);
