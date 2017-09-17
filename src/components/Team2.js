import React, { Component } from 'react';
import TeamTable from './TeamTable';

class Team2 extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data
    }
    render() {
        return(
            <TeamTable
                data={this.props.data}
                team={2}
            />
        );
    }
}

export default Team2;