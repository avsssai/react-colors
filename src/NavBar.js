import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import './NavBar.css';

export default class NavBar extends Component {
  render() {
      const {level,handleOnAfterChange} = this.props;
    return (
      <nav className="Navbar">
        <div className="logo">reactcolorpicker</div>
        <div className="slider-container">

            <span className='level'>Level {level}</span>

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
        </div>
      </nav>
    );
  }
}
