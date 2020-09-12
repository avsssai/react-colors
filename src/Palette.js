import React, { Component } from "react";
import NavBar from './NavBar';
import ColorBox from "./ColorBox";
import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
    };
    this.handleOnAfterChange = this.handleOnAfterChange.bind(this);
  }
  handleOnAfterChange(level) {
    this.setState({level})
  }
  render() {
    const { palette } = this.props;
    let { level } = this.state;
    console.log(this.state.level);
    return (
      <div>
        {/* Header/Nav component goes here */}
        <NavBar level={level} handleOnAfterChange={this.handleOnAfterChange}/>
        <div className="Palette">
          <div className="Palette-colors">
            {palette.colors[level].map((color, i) => {
              return (
                <ColorBox background={color.hex} name={color.name} key={i} />
              );
            })}
          </div>
        </div>
        {/* Footer goes here */}
      </div>
    );
  }
}
