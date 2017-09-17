import React, { Component } from 'react';
import axios from 'axios';
import XRegExp from 'xregexp';
import '../css/App.css';
import SearchBar from './SearchBar';
import Team1 from './Team1';
import Team2 from './Team2';
import {champions} from '../champions';


class App extends Component {

    state = {
        searchTerm: '',
        data: [],
    }

    getData = (data) => {
        let info = [];
        data.participants.forEach(player => {
            info = [...info, {
                name: player.summonerName,
                champIMG: champions.data[player.championId].image.full,
                champName: champions.data[player.championId].name
            }]
        });
        this.setState({
           data: info
        });
    }

    onSearchChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    onSubmit = () => {
        const { searchTerm } = this.state;
        if (searchTerm.length > 16) return;
        const regex = new XRegExp("^[0-9\\p{L} _\\.]+$");
        if (regex.test(searchTerm)) {
            axios.get(`/api/${encodeURI(searchTerm)}`)
                .then(res => {
                    return axios.get(`/api/active-game/${res.data.id}`);
                })
                .then(res => {
                    // Check participants to verify that the summoner is in game
                    console.log(res);
                    if (res.data.participants) {
                        this.getData(res.data);
                    }
                })
        }
        else {
            this.setState({
                data: []
            })
        }
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
                  {data.length !== 0 ?
                      <div>
                          <Team1 data={data}/>
                          <Team2 data={data}/>
                      </div> : ''}
              </div>
          </div>
        );
    }
}

export default App;
