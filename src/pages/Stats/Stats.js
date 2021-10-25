import React, { Component } from 'react'
import privateData from '../../private/secret.json'
import ApiRequest from '../../helper/ApiRequest';

export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    componentDidMount() {
        ApiRequest(privateData.Riot.get_account_by_puuid_endpoint + privateData.Riot.personal_puuid, 'RIOT')
            .then(data => {
                console.log(data);
            });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
            </div>
        )
    }
}

