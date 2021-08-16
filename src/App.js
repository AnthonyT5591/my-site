import logo from './logo.svg';
import './App.scss';
import { Component } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import Default from './pages/Default/Default';

const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: '#41257b',
  //   },
  //   secondary: green,
  //   background: {
  //     default: '#333'
  //   }
  // },
  overrides: {
    MuiListItem: {
      gutters: {
        paddingLeft: "22px"
      }
    }
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        {console.log(theme)}
        <Default />
      </ThemeProvider>
    )
  }
}