import React, { Component } from "react";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import seedColors from "./colors-seeder";
import { generatePalette } from "./colorHelpers";
import { Switch, Link, Route } from "react-router-dom";
import colorsSeeder from "./colors-seeder";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { withStyles } from "@material-ui/styles";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./App.css";

const styles = {};

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

    this.state = {
      palettes: savedPalettes || seedColors,
    };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.handlePaletteDelete = this.handlePaletteDelete.bind(this);
  }
  savePalette(newPalette) {
    // console.log(createdPalette);

    this.setState(
      {
        palettes: [...this.state.palettes, newPalette],
      },
      () => {
        this.syncToLocalStorage();
      }
    );

    console.log(newPalette);
  }

  syncToLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  findPalette = (id) => {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    });
  };
  handlePaletteDelete(paletteId) {
    // alert(paletteId);
    this.setState(
      {
        palettes: this.state.palettes.filter(
          (palette) => palette.id !== paletteId
        ),
      },
      () => this.syncToLocalStorage()
    );
  }
  render() {
    let { styles } = this.props;

    let linksOnly = (arr) => {
      return arr.reduce((acc, el) => {
        return acc.concat({ paletteName: el.paletteName, id: el.id });
      }, []);
    };
    return (
      <div>
        {/* <Palette palette={generatePalette(seedColors[4])} /> */}
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Switch location={location}>
                  <Route
                    exact
                    path="/palette/new"
                    render={(routeProps) => (
                      <div className="page">
                        <NewPaletteForm
                          savePalette={this.savePalette}
                          palettes={this.state.palettes}
                          {...routeProps}
                        />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={(routeProps) => (
                      <div className="page">
                        <PaletteList
                          palettes={this.state.palettes}
                          {...routeProps}
                          handlePaletteDelete={this.handlePaletteDelete}
                        />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/palette/:id"
                    render={(routeProps) => (
                      <div className="page">
                        <Palette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.id)
                          )}
                          {...routeProps}
                        />
                      </div>
                    )}
                  />
                  {/* <Route exact path="/:palette/:id" render={(routeProps) => <h1>Individual Palette</h1>} /> */}
                  <Route
                    exact
                    path="/palette/:paletteId/:id"
                    render={(routeProps) => (
                      <div className="page">
                        <SingleColorPalette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.paletteId)
                          )}
                          id={routeProps.match.params.id}
                          {...routeProps}
                        />
                      </div>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
