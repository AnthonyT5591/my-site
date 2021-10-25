import React from 'react';


import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';

// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FunctionsIcon from '@mui/icons-material/Functions';
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import Container from '@mui/material/Container';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

// import About from '../About/About';
// import Stats from '../Stats/Stats';
import Socials from '../Socials/Socials';
import Vitals from '../Vitals/Vitals';
import Algos from '../Algos/Algos'

import { Component } from 'react';


const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        overflowX: 'hidden',
  },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,

        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
      },

    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    paperPadding: {
        padding: "20px"
    },
    title: {
        fontSize: "20px",
        textDecoration: "underline"
    },

});

const itemList = [ // 0 index will be default path for "/"
    // { Text: 'About Me', Icon: <AccountBoxIcon />, path: "/about" },
    { Text: 'Socials', Icon: <ContactMailIcon color="primary" />, path: "/socials" },
    // { Text: 'Stats', Icon: <SportsEsportsIcon />, path: "/stats" },
    { Text: 'Algo Visualizer', Icon: <FunctionsIcon color="primary" />, path: "/algos" }
];
class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    toggleDrawer() {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <CssBaseline />
                <Router>
                    <Drawer
                        className={(this.state.drawerOpen) ? classes.drawerOpen + ' ' + classes.drawer : classes.drawerClose + ' ' + classes.drawer}
                        classes={{
                            paper: (this.state.drawerOpen) ? classes.drawerOpen + ' ' + classes.drawer : classes.drawerClose + ' ' + classes.drawer
                        }}
                        transitionDuration={{ enter: 2000, exit: 2000 }}
                        variant="permanent" open={this.state.drawerOpen} >
                        <List>
                            <ListItem button onClick={this.toggleDrawer}>
                                <ListItemIcon>{(!this.state.drawerOpen) ? <MenuIcon color="primary" /> : <MenuOpenIcon color="primary" />}</ListItemIcon>
                                <ListItemText className={classes.title} primary="Toxey.Dev" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            {itemList.map((obj, i) => (
                                <Link to={obj.path} key={i} style={{ textDecoration: 'none', color: '#b4c0cf' }}>
                                    <ListItem button key={obj.Text}>
                                        <ListItemIcon>{obj.Icon}</ListItemIcon>
                                        <ListItemText primary={obj.Text} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Drawer>

                    <main className={classes.content}>
                        <Paper elevation={3} className={classes.paperPadding}>
                            <Container maxWidth={false} disableGutters={true}>
                                <div className="app-content">
                                    <Switch>
                                        {/* <Route path="/stats">
                                            <Stats />
                                        </Route> */}
                                        <Route path="/socials">
                                            <Socials />
                                        </Route>
                                        {/* <Route path="/about">
                                            <About />
                                        </Route> */}
                                        <Route path="/algos">
                                            <Algos />
                                        </Route>
                                        <Route path="/vitals">
                                            <Vitals />
                                        </Route>
                                        <Route exact path="/">
                                            <Redirect to={itemList[0].path} />
                                        </Route>
                                    </Switch>
                                </div>
                            </Container>
                        </Paper>
                    </main>
                </Router >
            </div >
        );
    }

}

export default withStyles(styles, { withTheme: true })(Default)