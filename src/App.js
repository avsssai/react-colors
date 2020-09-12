import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './colors-seeder';
import { generatePalette } from './colorHelpers';
import { Switch, Link, Route } from 'react-router-dom';

class App extends Component {

  render () {
    console.log(generatePalette(seedColors[4]));
    let findPalette = (id) => {
      return seedColors.find((palette) => {
        return palette.id === id;
      })
    }
    return (
      <div>
        {/* <Palette palette={generatePalette(seedColors[4])} /> */}

        <Switch>
          <Route exact path="/" render={() => <h1>Main page</h1>} />
          <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} {...routeProps} />} />
          {/* <Route exact path="/:palette/:id" render={(routeProps) => <h1>Individual Palette</h1>} /> */}
        </Switch>
      </div>
    )
  }
}

export default App;
