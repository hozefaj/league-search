import React, { Component } from 'react';
import '../css/App.css';
import SearchBar from './SearchBar';
import Team1 from './Team1';
import Team2 from './Team2';
import axios from 'axios';

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
        const { searchTerm } = this.state;
        let id = 0;
        console.log(encodeURI(searchTerm));
        axios.get(`/api/${encodeURI(searchTerm)}`)
            .then(res => {
                id = res.data.id;
                return axios.get(`/api/active-game/${id}`);
            })
            .then(res => {
                this.setState({
                    data: res.data
                })
            })


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
                  <br/>
                  {data.length !== 0 ? <Team2 data={data}/> : ''}
              </div>
          </div>
        );
    }
}

export default App;
