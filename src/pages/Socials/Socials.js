import React, { Component } from 'react'
import privateData from '../../private/secret.json'

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";

import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
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
export default class Socials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [
                { Text: 'Email', Icon: <EmailIcon color="primary" />, href: privateData.Social.Email },
                { Text: 'Twitter', Icon: <TwitterIcon color="primary" />, href: privateData.Social.Twitter },
                { Text: 'Github', Icon: <GitHubIcon color="primary" />, href: privateData.Social.Github },
                { Text: 'LinkedIn', Icon: <LinkedInIcon color="primary" />, href: privateData.Social.LinkedIn },
            ]
        }

    }

    render() {
        return (
            <div>
                <div className={css(styles.title_container)}>
                    <div>Contact me!</div>
                    <Divider />
                </div>
                <List>
                    {this.state.itemList.map((obj, i) => (
                        <ListItem button key={obj.Text} className={(i % 2 === 0) ? css(styles.socials_container, styles.default) : css(styles.socials_container)} component="a" href={obj.href} target="_blank" rel="noreferrer noopener">
                            <ListItemIcon>{obj.Icon}</ListItemIcon>
                            <ListItemText primary={obj.Text} />
                        </ListItem>
                    ))}
                </List>
            </div >
        )
    }
}


