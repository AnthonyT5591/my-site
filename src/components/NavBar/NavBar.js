import React, { Component } from 'react'
import './NavBar.scss';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <div className="nav-container">
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" >
                                Dev.AnthonyT
                            </Typography>
                            <div>
                                <Link to="/">
                                    <IconButton color="secondary">
                                        <HomeOutlinedIcon />
                                    </IconButton>
                                </Link>
                                <Link to="/stats">
                                    <IconButton color="secondary">
                                        <SportsEsportsOutlinedIcon />
                                    </IconButton>
                                </Link>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
