import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
import SearchBar from './SearchBar';

class App extends Component {

    state = {
        summoner: '',
        searchTerm: ''
    }
/*
    searchThang = () => {
        const url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Thang?api_key=RGAPI-a0498d0a-fc2b-4af0-a032-3b9b14d0f2ad';
        axios.get(url).then(res => {
           this.setState({
                summoner: res.data.name
           })
            console.log(res);
        });
    }

*/

    onSearchChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    onSubmit = () => {
        const url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Thang?api_key=RGAPI-a0498d0a-fc2b-4af0-a032-3b9b14d0f2ad';
        axios.get(url).then(res => {
            this.setState({
                summoner: res.data.name
            })
            console.log(res);
        });
    }

    render() {
        return (
          <div className="App">
              <div
                className="text"
              >
                  League Search
              </div>
              <SearchBar
                onSearchChange={this.onSearchChange}
              />
          </div>
        );
    }
}

export default App;
