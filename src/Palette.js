import React, { Component } from "react";
import ColorBox from './ColorBox';
import './Palette.css';

export default class Palette extends Component {
  render() {
    return (
      <div>
        {/* Header/Nav component goes here */}
        <div className="Palette">
          <div className="Palette-colors">{
              this.props.colors.map((color,i)=>{
                  return <ColorBox background={color.color} name={color.name} key={i}/>
              })
          }</div>
        </div>
        {/* Footer goes here */}
      </div>
    );
  }
}
