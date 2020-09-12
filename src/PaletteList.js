import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class PaletteList extends Component {
    render () {
        let links = this.props.links.map((el, i) => {
            return (
                <div key={i}>
                    <Link to={`/palette/${el.id}`}>{el.paletteName}</Link>
                </div>
            )
        })
        return (
            <div>
                <h1>React Colors</h1>
                {links}
            </div>
        )
    }
}
