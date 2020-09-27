import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';

const drawerWidth = 400;

const styles = (theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between"
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
    buttons: {
        display: "flex"
    }
});

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paletteNameInput: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }

    componentDidMount () {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            if (
                this.props.palettes.every(
                    (palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
                )
            ) {
                return true;
            }
            return false;
        });

    }

    handleInputChange (e) {
        this.setState({
            paletteNameInput: e.target.value
        })
    }

    savePalette () {
        this.props.savePalette(this.state.paletteNameInput);
    }

    render () {
        const { classes, open } = this.props;
        const { paletteNameInput } = this.state;
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

                            <Button variant="contained" color="primary" type="submit">
                                Save Palette
                                </Button>
                        </ValidatorForm>

                        <Link to="/">
                            <Button variant="contained" color="secondary" >
                                Go Back
                                    </Button>
                        </Link>
                    </div>
                </AppBar>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteFormNav);