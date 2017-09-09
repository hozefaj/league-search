import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
import SearchBar from './SearchBar';

const API_KEY = `?api_key=RGAPI-a0498d0a-fc2b-4af0-a032-3b9b14d0f2ad`;

class App extends Component {

    state = {
        summoner: '',
        searchTerm: ''
    }

    onSearchChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    onSubmit = () => {
        const {summoner, searchTerm} = this.state;
        const url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${searchTerm}${API_KEY}`;
        axios.get(url).then(res => {
            this.setState({
                summoner: res.data.name
            });
            const url2 = `https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${res.data.id}${API_KEY}`;
            axios.get(url2).then(res => {
                console.log(res);
            });
        });
    }

    render() {
        const {summoner} = this.state;
        return (
          <div className="App">
              <div
                className="text"
              >
                  League Search
              </div>
              <SearchBar
                onSearchChange={this.onSearchChange}
                onSubmit={this.onSubmit}
              />

              <div>
                  {summoner}
              </div>
          </div>
        );
    }
}

export default App;
