import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { ChromePicker } from 'react-color';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Divider } from '@material-ui/core';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      // hex: "#ffffff",
      // hsl: {
      //   h: 0,
      //   s: 0,
      //   l: 100,
      //   a: 1
      // },
      // rgb: {
      //   r: 255,
      //   g: 255,
      //   b: 255,
      //   a: 1,
      // },
      hex: "#712626",
      hsl: { h: 0, s: 0.49499177754522344, l: 0.29592136, a: 1 },
      hsv: { h: 0, s: 0.6621999999999999, v: 0.4424, a: 1 },
      oldHue: 0,
      rgb: { r: 113, g: 38, b: 38, a: 1 },
    }
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleDrawerClose () {
    this.setState({
      open: false
    })
  }
  handleDrawerOpen () {
    this.setState({
      open: true
    })
  }
  handleChange (color, event) {
    this.setState({
      rgb: color.rgb,
      hex: color.hex
    })

    console.log(color);
  }
  render () {
    let { open, hex } = this.state;
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
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

            <Button variant="contained" color="secondary">Clear Palette</Button>
            <Button variant="contained" color="primary">Random Color</Button>
          </div>
          <Typography variant="h4">Design your palette</Typography>
          <ChromePicker color={this.state.rgb} onChangeComplete={this.handleChange} />
          <Button variant="contained" color="primary" >Add Color</Button>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
          style={{ background: this.state.rgb }}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );

  }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);