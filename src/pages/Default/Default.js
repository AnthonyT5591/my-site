import React, { Component } from 'react'
import './Default.scss';
import { Container } from '@material-ui/core';
import NavBar from '../../components/NavBar/NavBar';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import About from '../About/About';
import Stats from '../Stats/Stats';

export default class Default extends Component {

    render() {
        return (
            <Container maxWidth="false" disableGutters={true}>
                <div className="app-container">
                    <Router>
                        <NavBar />
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
                    </Router>
                </div>
            </Container>
        )
    }
}
