import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Paper, withStyles } from '@material-ui/core'

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FunctionsIcon from '@material-ui/icons/Functions';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import { Container } from '@material-ui/core';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import About from '../About/About';
import Stats from '../Stats/Stats';
import Socials from '../Socials/Socials';
import Vitals from '../Vitals/Vitals';
import Algos from '../Algos/Algos'

import { Component } from 'react';


const drawerWidth = 240;
const useStyles = (theme) => ({
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
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
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
    { Text: 'Socials', Icon: <ContactMailIcon />, path: "/socials" },
    // { Text: 'Stats', Icon: <SportsEsportsIcon />, path: "/stats" },
    { Text: 'Algos', Icon: <FunctionsIcon />, path: "/algos" }
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
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: this.state.drawerOpen,
                            [classes.drawerClose]: !this.state.drawerOpen,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: this.state.drawerOpen,
                                [classes.drawerClose]: !this.state.drawerOpen,
                            }),
                        }}
                    >
                        <List>
                            <ListItem button onClick={this.toggleDrawer}>
                                <ListItemIcon>{(!this.state.drawerOpen) ? <MenuIcon /> : <MenuOpenIcon />}</ListItemIcon>
                                <ListItemText className={classes.title} primary="Toxey.Dev" />
                            </ListItem>
                        </List>

                        <Divider />

                        <List>
                            {itemList.map((obj, i) => (
                                <Link to={obj.path} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default withStyles(useStyles)(Default)