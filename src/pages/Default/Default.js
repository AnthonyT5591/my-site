import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Container } from '@material-ui/core';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import About from '../About/About';
import Stats from '../Stats/Stats';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

const itemList = [
    { Text: 'About Me', Icon: <AccountBoxIcon />, path: "/" },
    { Text: 'Stats', Icon: <SportsEsportsIcon />, path: "/stats" },
];
export default function Default() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
            <Router>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
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
                    <div className={classes.toolbar} />
                    <Container disableGutters={true}>
                        <div className="app-content">
                            <Switch>
                                <Route path="/stats">
                                    <Stats />
                                </Route>
                                <Route path="/">
                                    <About />
                                </Route>
                            </Switch>
                        </div>
                    </Container>
                </main>
            </Router>
        </div>
    );
}