import './App.scss';
import { Component } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Default from './pages/Default/Default';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b4c0cf',
    },
    secondary: {
      main: '#00e676'
    },
    info: {
      main: '#e60070'
    },
    background: {
      default: '#161b22'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#344050',
          transition: 'none',
          WebkitTransition: 'none',
          color: '#b4c0cf'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px"
        }
      }
    }
  }
});

theme.components.MuiPaper.styleOverrides.root.transition = theme.transitions.create('width', {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.standard,
})
theme.components.MuiPaper.styleOverrides.root.WebkitTransition = theme.transitions.create('width', {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.standard,
})
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Default />
      </ThemeProvider>
    )
  }
}