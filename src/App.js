import React, { Component } from 'react';
import PaletteList from './PaletteList';
import Palette from './Palette';
import seedColors from './colors-seeder';
import { generatePalette } from './colorHelpers';
import { Switch, Link, Route } from 'react-router-dom';
import colorsSeeder from './colors-seeder';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import {withStyles} from '@material-ui/styles';

const styles = {

}
class App extends Component {
savePalette(newPalette){
  console.log(newPalette);
}
  render () {
    let {styles} = this.props;
    console.log(generatePalette(seedColors[4]));
    let findPalette = (id) => {
      return seedColors.find((palette) => {
        return palette.id === id;
      })
    }
    let linksOnly = (arr) => {
      return arr.reduce((acc, el) => {
        return acc.concat({ paletteName: el.paletteName, id: el.id })
      }, [])
    }
    return (
      <div>
        {/* <Palette palette={generatePalette(seedColors[4])} /> */}

        <Switch>
          <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps} />} />
          <Route exact path="/" render={(routeProps) => <PaletteList palettes={colorsSeeder} {...routeProps} />} />
          <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} {...routeProps} />} />
          {/* <Route exact path="/:palette/:id" render={(routeProps) => <h1>Individual Palette</h1>} /> */}
          <Route exact path="/palette/:paletteId/:id" render={routeProps => <SingleColorPalette palette={generatePalette(findPalette(routeProps.match.params.paletteId))} id={routeProps.match.params.id} {...routeProps} />} />
        </Switch>
      </div>
    )
  }
}

export default withStyles(styles)(App);
