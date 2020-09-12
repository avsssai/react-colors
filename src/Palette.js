import React, { Component } from "react";
import NavBar from './NavBar';
import ColorBox from "./ColorBox";
import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      colorFormat:'rgb'
    };
    this.handleOnAfterChange = this.handleOnAfterChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleOnAfterChange(level) {
    this.setState({level})
  }
  handleChange(format){
    this.setState({
      colorFormat:format
    })
  }
  render() {
    const { palette } = this.props;
    let { level, colorFormat } = this.state;
    console.log(this.state.level);
    return (
      <div>
        {/* Header/Nav component goes here */}
        <NavBar level={level} handleOnAfterChange={this.handleOnAfterChange} colorFormat={colorFormat} handleChange={this.handleChange}/>
        <div className="Palette">
          <div className="Palette-colors">
            {palette.colors[level].map((color, i) => {
              return (
                <ColorBox background={color[colorFormat]} name={color.name} key={i} />
              );
            })}
          </div>
        </div>
        {/* Footer goes here */}
      </div>
    );
  }
}
