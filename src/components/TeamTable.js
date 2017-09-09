import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import '../css/TeamTable.css'

let id = 0;

const styles = theme => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
});

const TeamTable = ({data, team}) => {
    let arr = [];
    const participants = data.participants;
    const teamLength = data.participants.length;
    if (team === 1) {
        arr = participants.slice(0, teamLength / 2);
    }
    if (team === 2) {
        arr = participants.slice(teamLength / 2, teamLength);
    }
    return(
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell numeric> Champion </TableCell>
                        <TableCell numeric> Rank </TableCell>
                    </TableRow>

                </TableHead>
                    <TableBody>
                        {arr.map(player => {
                            return(
                                <TableRow key={id++}>
                                    <TableCell>{player.summonerName}</TableCell>
                                    <TableCell numeric>{player.championId}</TableCell>
                                    <TableCell numeric>{1}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(TeamTable);