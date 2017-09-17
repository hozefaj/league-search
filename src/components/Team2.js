import React from 'react';
import TeamTable from './TeamTable';

class Team2 extends React.Component {

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