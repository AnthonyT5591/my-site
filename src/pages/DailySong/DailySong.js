import React, { Component } from 'react'
import privateData from '../../private/secret.json'

import {
    Divider,
} from "@mui/material";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
    title_container: {
        marginBottom: "10px",
    },
    socials_container: {
        borderRadius: "10px",
    },
    default: {
        backgroundColor: "#161b22",
    },
    accent: {
        backgroundColor: "#221d16",
    }
});
export default class DailySong extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return (
            <div>
                <div className={css(styles.title_container)}>
                    <div>Daily Song</div>
                    <Divider />
                </div>
            </div >
        )
    }
}


