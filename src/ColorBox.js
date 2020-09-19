import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from 'react-router-dom'
import chroma from 'chroma-js';
import "./ColorBox.css";


export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
    this.changeCopyState = this.changeCopyState.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }
  changeCopyState () {
    this.setState(
      {
        copied: true,
      },
      () => {
        setTimeout(() => this.setState({ copied: false }), 1500);
      }
    );

  }

  handleMoreClick (e) {
    e.stopPropagation();
  }

  render () {
    const { background, name, moreUrl, showLink } = this.props;
    let { copied } = this.state;
    let luminanceThreshold = chroma(background).luminance() <= 0.4;
    let customClass =  luminanceThreshold ? 'isDarkColor' : 'isLightColor';
    let moreButtonClass = luminanceThreshold ? 'see-more-dark' : 'see-more-light';
    let copiedBanner = luminanceThreshold ? 'copied-banner-dark' : 'copied-banner-light';
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ backgroundColor: background }}>
          <div className={`copy-overlay ${copied && 'show'}`} style={{ background }}></div>
          <div className={`overlay-text ${copied && 'show-text'} ${copiedBanner}`} >
            <h1>COPIED!</h1>
            <p>{background}</p>
          </div>
          <div className="copy-content">
            <div className="box-content">
              <span className={customClass}>{name}</span>
            </div>
            <button className={`${!luminanceThreshold ? 'copy-button dark-color' : 'copy-button'}`} >Copy</button>
            {showLink && (
              <div className={moreButtonClass} >

                <Link to={moreUrl} onClick={this.handleMoreClick} className={customClass} >
                  More
              </Link>
              </div>

            )}

          </div>
        </div>
      </CopyToClipboard>
    );
  }
}
