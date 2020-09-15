import React, { Component } from "react";
import NavBar from './NavBar';
import ColorBox from "./ColorBox";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      colorFormat: 'hex',
      snackbarOpen: false
    };
    this.handleOnAfterChange = this.handleOnAfterChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }
  handleOnAfterChange (level) {
    this.setState({ level })
  }
  handleChange (format) {
    this.setState({
      colorFormat: format,
      snackbarOpen: true
    })
  }
  handleSnackbarClose () {
    this.setState({
      snackbarOpen: false
    })
  }

  

  render () {
    const { palette } = this.props;
    let { level, colorFormat } = this.state;
    console.log(this.state.level);
    return (
      <div>
        {/* Header/Nav component goes here */}
        <div className="Palette">
          <NavBar level={level} handleOnAfterChange={this.handleOnAfterChange} colorFormat={colorFormat} handleChange={this.handleChange} />
          <div className="Palette-colors">
            {palette.colors[level].map((color, i) => {
              return (
                <ColorBox background={color[colorFormat]} name={color.name} key={i} moreUrl={`/palette/${palette.id}/${color.id}`}  />
              );
            })}
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            autoHideDuration={4000}
            open={this.state.snackbarOpen}
            onClose={this.handleSnackbarClose}
            message={`Format changed to ${colorFormat.toUpperCase()}`}
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />

          {/* Footer goes here */}
          <footer className="footer">
            <div className="footer-content">
              <span className="palette-name">{palette.paletteName}</span>
              <span className="palette-emoji">{palette.emoji}</span>
            </div>
          </footer>
        </div>

      </div>
    );
  }
}
