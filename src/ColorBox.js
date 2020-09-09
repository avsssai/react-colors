import React, { Component } from 'react'
import './ColorBox.css';


export default class ColorBox extends Component {
    render() {
        const { background,name} = this.props;
        return (
            <div className="ColorBox" style={{ backgroundColor:background}}>
               <div className="copy-content">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                    <button className="copy-button">Copy</button>
                    <div className="see-more">More</div>

               </div>
            </div>
        )
    }
}
