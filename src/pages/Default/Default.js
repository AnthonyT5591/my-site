import React from 'react';

import logo from '../../logo.png'
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { withTheme } from '@mui/styles';

// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CollectionsIcon from '@mui/icons-material/Collections';
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
import DailySong from '../DailySong/DailySong';
import Gallery from '../Gallery/Gallery';

import { Component } from 'react';
import { StyleSheet, css } from "aphrodite";


const itemList = [ // 0 index will be default path for "/"
    // { Text: 'About Me', Icon: <AccountBoxIcon />, path: "/about" },
    { Text: 'Socials', Icon: <ContactMailIcon color="primary" />, path: "/socials" },
    // { Text: 'Stats', Icon: <SportsEsportsIcon />, path: "/stats" },
    { Text: 'Algo Visualizer', Icon: <FunctionsIcon color="primary" />, path: "/algos" },
    // { Text: 'Daily Song', Icon: <SportsEsportsIcon color="primary" />, path: "/dailySong" }
    { Text: 'Trending Gifs', Icon: <CollectionsIcon color="primary" />, path: "/gallery" }
];
class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            version: 'v1.0.2'
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    toggleDrawer() {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }
    render() {
        const { theme } = this.props;
        const drawerWidth = 240;
        const styles = StyleSheet.create({
            root: {
                display: 'flex',
                [theme.breakpoints.down('lg')]: {
                    flexDirection: 'column'
                }
            },
            drawer: {
                width: drawerWidth,
                height: '100vh',
                flexShrink: 0,
                [theme.breakpoints.down('lg')]: {
                    // height: `calc(${theme.spacing(10) + theme.spacing(itemList.length)} + 1px)`,

                    height: `calc(${theme.spacing(10 * itemList.length)} + 1px)`,
                    width: "100%",
                }
            },

            drawerOpen: {
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.standard,
                }),
                overflowX: 'hidden',
                [theme.breakpoints.down('lg')]: {
                    transition: theme.transitions.create('height', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.standard,
                    }),
                    overflowY: 'hidden',
                }

            },
            drawerClose: {
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.standard,
                }),
                overflowX: 'hidden',
                width: `calc(${theme.spacing(7)} + 1px)`,
                [theme.breakpoints.down('lg')]: {
                    transition: theme.transitions.create('height', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.standard,
                    }),
                    overflowY: 'hidden',
                    height: `calc(${theme.spacing(10)} + 1px)`,
                    width: "100%",
                }
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
            logo_img: {
                width: "5rem",
                marginRight: "1rem"
            },
            versionText: {
                fontSize: '14px'
            }
        });

        return (
            <div className={css(styles.root)} >
                <CssBaseline />
                <Router>
                    <Drawer
                        className={(this.state.drawerOpen) ? css(styles.drawer, styles.drawerOpen) : css(styles.drawer, styles.drawerClose)}
                        classes={{
                            paper: (this.state.drawerOpen) ? css(styles.drawer, styles.drawerOpen) : css(styles.drawer, styles.drawerClose)
                        }}
                        anchor={theme.breakpoints.down('lg') ? 'top' : 'left'}
                        transitionDuration={{ enter: 2000, exit: 2000 }}
                        variant="permanent"
                        open={this.state.drawerOpen} >
                        <List>
                            <ListItem button onClick={this.toggleDrawer}>
                                <ListItemIcon>{(!this.state.drawerOpen) ? <MenuIcon color="primary" /> : <MenuOpenIcon color="primary" />}</ListItemIcon>
                                {/* <ListItemText className={classes.title} primary="Toxey.Dev" />
                                 */}
                                <img alt="bruh its my logo" className={css(styles.logo_img)} src={logo} />
                                <div className={css(styles.versionText)}>{this.state.version}</div>
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

                    <main className={css(styles.content)}>
                        <Paper elevation={3} className={css(styles.paperPadding)}>
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
                                        <Route path="/gallery">
                                            <Gallery />
                                        </Route>
                                        {/* <Route path="/dailySong">
                                            <DailySong />
                                        </Route> */}
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

export default withTheme(Default)