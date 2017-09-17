import React, { Component } from 'react';
import XRegExp from 'xregexp';
import '../css/App.css';
import SearchBar from './SearchBar';
import Team1 from './Team1';
import Team2 from './Team2';
import {champions} from '../champions';
import { CircularProgress } from 'material-ui/Progress';

class App extends Component {
    /*
        @searchTerm: Keeps track of what is inside the input form
        @data: Holds the data from the API. An item in this array is an object
        with properties: name, champName, champIMG, and rank.
        @status: Keeps track of the status of the application.
     */
    state = {
        searchTerm: '',
        data: [],
        status: ''
    }
    /*
        Changes the value of the current input of the form
     */
    onSearchChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    async onSubmit() {
        this.setState({
            data: [],
            status: <CircularProgress/>
        });
        const { searchTerm } = this.state;
        if (searchTerm.length > 16) return;
        const regex = new XRegExp("^[0-9\\p{L} _\\.]+$");
        if (regex.test(searchTerm)) {
            try {
                const playerData = await fetchPlayer(encodeURI(searchTerm));
                const activeGameData = await fetchActiveGame(playerData.id);
                const theData = await Promise.all(activeGameData.participants.map(async player => {
                    const rankData = await fetchRank(player.summonerId);
                    return {
                        name: player.summonerName,
                        champName: champions.data[player.championId].name,
                        champIMG: champions.data[player.championId].image.full,
                        rank: (rankData[0] ? adjustWord(rankData[0].tier) + ' ' + rankData[0].rank : 'Unranked')
                    }
                }))
                this.setState({
                    data: theData
                })
            }
            catch (err) {
                console.log(err);
                this.setState({
                    data: [],
                    status: `${searchTerm} is not in game`
                });
            }
        }
        else {
            this.setState({
                data: [],
                status: `${searchTerm} does not exist`
            })
        }
    }

    render() {
        const { data, status } = this.state;
        return (
          <div className="App">
              <div className="text">
                  League Search
              </div>
              <SearchBar
                onSearchChange={this.onSearchChange}
                onSubmit={this.onSubmit.bind(this)}/>
              <div>
                  {
                      data.length !== 0 ?
                      <div>
                          <Team1 data={data}/>
                          <Team2 data={data}/>
                      </div> : <div className="bottom-text"> {status} </div>
                  }
              </div>
          </div>
        );
    }
}
/*
    Gets player information from SUMMONER-V3 endpoint
 */
async function fetchPlayer(name) {
    let response = await fetch(`/api/${name}`);
    return response.json();
}
/*
    Gets active game data from SPECTATOR-V3 endpoint
 */
async function fetchActiveGame(id) {
    let response = await fetch(`/api/active-game/${id}`);
    return response.json();
}
/*
    Gets rank information from LEAGUE-V3 endpoint
 */
async function fetchRank(id) {
    let response = await fetch(`/api/rank/${id}`);
    return response.json();
}
/*
    Makes all but the first letter lowercase
 */
function adjustWord(word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
}

export default App;
