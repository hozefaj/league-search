import React, { Component } from 'react';
import '../css/App.css';
import SearchBar from './SearchBar';
import Team1 from './Team1';
import Team2 from './Team2';

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

        fetch(`/api/${searchTerm}`)
            .then(res => res.json())
            .then(res => this.setState({
                data: res
            }));
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
