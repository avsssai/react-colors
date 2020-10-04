import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";

import seedColors from "./colors-seeder";
import { generatePalette } from "./colorHelpers";

import "./Page.css";

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
  savePalette (newPalette) {
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

  syncToLocalStorage () {
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
  handlePaletteDelete (paletteId) {
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
  render () {
    return (
      <div>
        {/* <Palette palette={generatePalette(seedColors[4])} /> */}
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="page" timeout={600}>
                <Switch location={location}>
                  <Route
                    exact
                    path="/palette/new"
                    render={(routeProps) => (
                      <Page>
                        <NewPaletteForm
                          savePalette={this.savePalette}
                          palettes={this.state.palettes}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={(routeProps) => (
                      <Page>
                        <PaletteList
                          palettes={this.state.palettes}
                          {...routeProps}
                          handlePaletteDelete={this.handlePaletteDelete}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    exact
                    path="/palette/:id"
                    render={(routeProps) => (
                      <Page>
                        <Palette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.id)
                          )}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                  {/* <Route exact path="/:palette/:id" render={(routeProps) => <h1>Individual Palette</h1>} /> */}
                  <Route
                    exact
                    path="/palette/:paletteId/:id"
                    render={(routeProps) => (
                      <Page>
                        <SingleColorPalette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.paletteId)
                          )}
                          id={routeProps.match.params.id}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    render={(routeProps) => (
                      <Page>
                        <PaletteList
                          palettes={this.state.palettes}
                          {...routeProps}
                          handlePaletteDelete={this.handlePaletteDelete}
                        />
                      </Page>
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

export default (App);
