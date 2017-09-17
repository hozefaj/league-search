import React from 'react';
import TeamTable from './TeamTable';

class Team1 extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data
    }

    render() {
        return(
            <TeamTable
                data={this.props.data}
                team={1}
            />
        );
    }
}

export default Team1;