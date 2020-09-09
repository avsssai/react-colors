import React, { Component } from "react";

export default class Palette extends Component {
  render() {
    return (
      <div>
        {/* Header/Nav component goes here */}
        <div className="Palette">
          <div className="Palette-colors">{/* Palette colors go here */}</div>
        </div>
        {/* Footer goes here */}
      </div>
    );
  }
}
