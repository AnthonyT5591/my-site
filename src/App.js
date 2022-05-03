import './App.scss';
import { Component } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Default from './pages/Default/Default';
import { green } from '@mui/material/colors';

let theme = createTheme();
theme = createTheme({
  palette: {
    primary: {
      main: '#b4c0cf',
    },
    secondary: {
      main: '#00e676'
    },
    info: {
      main: '#e60070',
    },
    background: {
      default: '#161b22'
    },
    action: {
      // disabledBackground: "#b4c0cf"
    }

  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          position: 'relative',
          overflowY: 'hidden',
          // height: 'inherit',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          WebkitTransition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        },
        [theme.breakpoints.down('lg')]: {
          paper: {
            transition: theme.transitions.create('height', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
            WebkitTransition: theme.transitions.create('height', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          }
        },

      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#344050',
          color: '#b4c0cf'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          justifyContent: "space-between"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          ":focus-within": {
            color: green.A400
          }
        }
      }
    }
  }
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Default />
      </ThemeProvider>
    )
  }
}