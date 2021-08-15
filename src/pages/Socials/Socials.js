import React, { Component } from 'react'
import privateData from '../../private/secret.json'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = (theme) => ({
    container: {

    },
});
class Socials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [
                { Text: 'Twitter', Icon: <TwitterIcon />, href: privateData.Social.Twitter },
                { Text: 'Github', Icon: <GitHubIcon />, href: privateData.Social.Github },
                { Text: 'LinkedIn', Icon: <LinkedInIcon />, href: privateData.Social.LinkedIn },
            ]
        }

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <List>
                    {this.state.itemList.map((obj, i) => (
                        <ListItem button key={obj.Text} component="a" href={obj.href} target="_blank" rel="noreferrer noopener">
                            <ListItemIcon>{obj.Icon}</ListItemIcon>
                            <ListItemText primary={obj.Text} />
                        </ListItem>
                    ))}
                </List>
            </div >
        )
    }
}

export default withStyles(useStyles)(Socials)
