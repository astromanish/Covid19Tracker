import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import DistrictData from './components/DistrictData';


class App extends Component {
    render(){
        return (
          <BrowserRouter>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Home} />
              <Route exact path="/:dist_id" component={DistrictData} />
            </div>
          </BrowserRouter>
        );
    }
}

export default App;