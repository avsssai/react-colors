import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue, red } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Cancel";
import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toDelete: null,
    };
    this.handlePaletteClick = this.handlePaletteClick.bind(this);
    this.handlePaletteDelete = this.handlePaletteDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
  }
  handlePaletteClick (id) {
    // console.log('hello');
    this.props.history.push(`/palette/${id}`);
  }
  handlePaletteDelete () {
    this.props.handlePaletteDelete(this.state.toDelete);
    this.setState({
      open: false,
      toDelete: null,
    });
  }
  handleClose () {
    this.setState({
      open: false,
      toDelete: null,
    });
  }
  handleDialogOpen (id) {
    this.setState({
      open: true,
      toDelete: id,
    });
  }
  render () {
    let { palettes, classes } = this.props;
    let { open } = this.state;

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
                    handleDialogOpen={this.handleDialogOpen}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">Delete palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handlePaletteDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{
                    background: blue[100],
                    color: blue[600],
                    fontSize: "large",
                  }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Yes</ListItemText>
            </ListItem>
            <ListItem button onClick={this.handleClose}>
              <ListItemAvatar>
                <Avatar
                  style={{
                    background: red[100],
                    color: red[600],
                    fontSize: "large",
                  }}
                >
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>No</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
