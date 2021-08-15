import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import ApiRequest from '../../helper/ApiRequest';

const useStyles = (theme) => ({
    container: {

    },
});
class Vitals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vitals: {
                info: 'No valid vitals.',
                date: 'N/A'
            }
        };
    }
    componentDidMount() {
        ApiRequest('', 'VITALS')
            .then(passData => {
                this.setState({ vitals: passData });
                console.log(this.state);
            });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div>{this.state.vitals.info}</div>
                <div>{this.state.vitals.date}</div>
            </div>
        )
    }
}


export default withStyles(useStyles)(Vitals)
