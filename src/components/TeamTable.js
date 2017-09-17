import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import '../css/TeamTable.css'

const TeamTable = ({data, team}) => {
    let id = 0;
    if (data) {
        let arr = [];
        const teamLength = data.length;
        if (team === 1) {
            arr = data.slice(0, teamLength / 2);
        }
        if (team === 2) {
            arr = data.slice(teamLength / 2, teamLength);
        }
        return (
            <Paper className="paper">
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
                            const url = `/ddragon/7.18.1/img/champion/${player.champIMG}`;
                            return (
                                <TableRow key={id++}>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell> <img src={url} height="35" width="35"/> {player.champName} </TableCell>
                                    <TableCell numeric>{1}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default TeamTable;