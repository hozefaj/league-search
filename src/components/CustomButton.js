import React from 'react'
import Button from 'material-ui/Button'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

const CustomButton = ({onClick}) => (
    <MuiThemeProvider theme={theme}>
            <Button raised
                    className="button"
                    color="primary"
                    onClick={onClick}
            >
                {'Search'}
            </Button>
    </MuiThemeProvider>
);

export default CustomButton;