import React,{Component} from 'react';
import Palette from './Palette';
import seedColors from './colors-seeder';

class App extends Component {

  render() {
    return(
      <div>
        <h1>Color Palette App!</h1>
        <Palette {...seedColors[4]}/>
      </div>
    )
  }
}

export default App;
