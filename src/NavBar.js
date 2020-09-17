import React, { Component } from "react";
import Slider from "rc-slider";
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import "rc-slider/assets/index.css";


import './NavBar.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorFormat: 'hex'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (e) {
    this.setState({
      colorFormat: e.target.value
    })
    console.log(e.target.value);
    this.props.handleChange(e.target.value);
  }
  render () {
    const { level, handleOnAfterChange, showing } = this.props;
    return (
      <nav className="Navbar">
        <Link to="/">
          <div className="logo">reactcolorpicker</div>
        </Link>
        <div className="slider-container">

          <span className='level'>Level {level}</span>
          {showing && (
            <div className="slider">
              <Slider
                min={100}
                max={900}
                defaultValue={level}
                onAfterChange={handleOnAfterChange}
                step={100}
                className="slider"
              />
            </div>

          )}
        </div>
        <div className="select-container">
          <Select onChange={this.handleChange} value={this.state.colorFormat}>
            <MenuItem value='hex'>Hex - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - (255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - (255,255,255,1.0)</MenuItem>
          </Select>
        </div>
      </nav>
    );
  }
}
