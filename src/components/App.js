import React, { Component } from 'react';
import XRegExp from 'xregexp';
import '../css/App.css';
import SearchBar from './SearchBar';
import Team1 from './Team1';
import Team2 from './Team2';
import {champions} from '../champions';
import { CircularProgress } from 'material-ui/Progress';




class App extends Component {

    state = {
        searchTerm: '',
        data: [],
        status: ''
    }

    onSearchChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    async onSubmit() {
        const { searchTerm } = this.state;
        if (searchTerm.length > 16) return;
        const regex = new XRegExp("^[0-9\\p{L} _\\.]+$");
        if (regex.test(searchTerm)) {
            const playerData = await fetchPlayer(searchTerm);
            const activeGameData = await fetchActiveGame(playerData.id);
            const theData = await Promise.all(activeGameData.participants.map(async player => {
                const rankData = await fetchRank(player.summonerId);
                return {
                    name: player.summonerName,
                    champName: champions.data[player.championId].name,
                    champIMG: champions.data[player.championId].image.full,
                    rank: rankData[0].tier
                }
            }))
            this.setState({
                data: theData
            })
        }
    }


    render() {
        const { data, status } = this.state;
        return (
          <div className="App">
              <div
                className="text"
              >
                  League Search
              </div>
              <SearchBar
                onSearchChange={this.onSearchChange}
                onSubmit={this.onSubmit.bind(this)}
              />

              <div>
                  {data.length !== 0 ?
                      <div>
                          <Team1 data={data}/>
                          <Team2 data={data}/>
                      </div> : <div className="bottom-text"> {status} </div>}
              </div>
          </div>
        );
    }
}

async function fetchPlayer(name) {
    let response = await fetch(`/api/${name}`);
    return response.json();
}

async function fetchActiveGame(id) {
    let response = await fetch(`/api/active-game/${id}`);
    return response.json();
}

async function fetchRank(id) {
    let response = await fetch(`/api/rank/${id}`);
    return response.json();
}

export default App;
