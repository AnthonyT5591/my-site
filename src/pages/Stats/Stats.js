import React, { Component } from 'react'
import { Paper, withStyles } from '@material-ui/core'
import privateData from '../../private/secret.json'
import ApiRequest from '../../helper/ApiRequest';
const useStyles = (theme) => ({
    container: {

    },
    paperPadding: {
        padding: '20px'
    }
});

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        ApiRequest(privateData.Riot.get_account_by_puuid_endpoint + privateData.Riot.personal_puuid);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Paper elevation={3} className={classes.paperPadding}>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum et sollicitudin ac. Eu consequat ac felis donec et. Placerat in egestas erat imperdiet sed euismod. Nunc aliquet bibendum enim facilisis gravida neque convallis. Nulla at volutpat diam ut. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Lobortis feugiat vivamus at augue. Donec enim diam vulputate ut pharetra. Justo nec ultrices dui sapien eget mi proin sed libero.</div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(useStyles)(Stats)

