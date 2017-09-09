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

const TeamTable = ({data}) => {
    return(
        <Paper>

        </Paper>
    );
}

export default withStyles(styles)(TeamTable);
