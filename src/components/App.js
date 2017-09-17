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

     getActiveGameData = async () => {
        const { searchTerm } = this.state;
        try{
            const response = await fetch(`/api/${encodeURI(searchTerm)}`);
            const accountData = await response.json();
            console.log(accountData);
            const response2 = await fetch(`/api/active-game/${accountData.id}`);
            const activeGameData = await response2.json();
            console.log(activeGameData);
            let info = [];

            for (let i = 0; i < activeGameData.participants.length; i++) {
                const player = activeGameData.participants[i];
                const response3 = await fetch(`/api/rank/${player.summonerId}`);
                let rankData = await response3.json();
                info = [...info, {
                    name: player.summonerName,
                    rank: rankData.length > 0 ? rankData[0].tier : 'Unranked',
                    champIMG: champions.data[player.championId].image.full,
                    champName: champions.data[player.championId].name
                }]
            }
            this.setState({
                data: info
            })
        }
        catch (err) {
            console.log(err);
        }
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
            this.getActiveGameData();
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
