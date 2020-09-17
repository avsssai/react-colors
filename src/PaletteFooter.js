import React, { Component } from 'react'
import './Palette.css';

export default class PaletteFooter extends Component {
    render() {
        const {paletteName, paletteEmoji} = this.props;
        return (
          <footer className="footer">
          <div className="footer-content">
            <span className="palette-name">{paletteName}</span>
            <span className="palette-emoji">{paletteEmoji}</span>
          </div>
        </footer>
        )
    }
}
