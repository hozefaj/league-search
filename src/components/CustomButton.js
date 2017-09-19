import React from 'react'
import Button from 'material-ui/Button'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

const CustomButton = () => (
    <MuiThemeProvider theme={theme}>
            <Button raised
                    className="button"
                    color="primary"
            >
                {'Search'}
            </Button>
    </MuiThemeProvider>
);

export default CustomButton;