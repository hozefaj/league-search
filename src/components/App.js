import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
import SearchBar from './SearchBar';
import Team1 from './Team1';
import Team2 from './Team2';
import TeamTable from './TeamTable';

const API_KEY = `?api_key=RGAPI-211a1e0c-0bdf-47da-be18-bff6a88dfa11`;

class App extends Component {

    state = {
        searchTerm: '',
        data: []
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
                this.setState({
                    data: res.data
                });
            });
        });
    }

    render() {
        const {data} = this.state;
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
                  {data.length !== 0 ? <Team1 data={data}/> : ''}
              </div>
              <br/>
              <div>
                  {data.length !== 0 ? <Team2 data={data}/> : ''}
              </div>
          </div>
        );
    }
}

export default App;
