import './App.css';
import { Component } from 'react';
import {Searchbar} from './components/Searchbar/Searchbar';
import {ImageGallery} from './components/ImageGallery/ImageGallery';
// import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    searchValue: '',
  }

  getSearchValue = searchValue => this.setState({ searchValue });
  
  render() {
    return (
      <div className="App">
        <Searchbar getSearchValue={this.getSearchValue} />
        <ImageGallery searchValue={this.state.searchValue} />
      
      </div>
    )
  }
}

export default App;

  /*    <Loader
     type="Puff"
     color="#00BFFF"
     height={100}
     width={100}
     timeout={3000}/> */