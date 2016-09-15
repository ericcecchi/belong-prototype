import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import palette from './data/Colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette,
    appBar: {
        height: 50,
    },
});

const ThemeWrapper = ()=> (
    <MuiThemeProvider muiTheme={muiTheme}>
        <App />
    </MuiThemeProvider>
);

ReactDOM.render(<ThemeWrapper />, document.getElementById('app'));
