import React, { Component } from 'react'
import privateData from '../../private/secret.json'

import {
    Divider,
    Button,
    TextField,
    Chip
} from "@mui/material";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
    title_container: {
        marginBottom: "10px",
    },
    calc_container: {
        borderRadius: "10px",
    },
    add_container: {
        display: "flex",
        alignItems: "center"
    },
    costs_container: {
        display: "flex"
    },
    button: {
        margin: "0px 10px"
    },
    images: {
        padding: "2px",
        cursor: "pointer"
    },
    default: {
        backgroundColor: "#161b22",
    },
    accent: {
        backgroundColor: "#221d16",
    }
});
export default class SplitCostsCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sharedObject: [],
            sharedName: '',
            sharedCosts: [] = [],
        }

        this.handleShareInputChange = this.handleShareInputChange.bind(this);
        this.handleCostInputChange = this.handleCostInputChange.bind(this);
        this.addShare = this.addShare.bind(this);
        this.addCost = this.addCost.bind(this);
    }

    addShare() {
        let temp = this.state.sharedObject;
        let temp2 = this.state.sharedCosts;
        temp.push(
            {
                displayName: this.state.sharedName,
                totalCost: 0,
                costs: []
            }
        );
        temp2.push(0);

        this.setState({
            sharedObject: temp,
            sharedName: '',
            sharedCosts: temp2
        });
        console.log(this.state)
    }

    addCost(index) {
        let temp = [...this.state.sharedCosts];
        let temp2 = [...this.state.sharedObject];
        temp2[index].totalCost += temp[index];
        temp2[index].costs.push(temp[index])
        temp[index] = 0;

        this.setState({
            sharedObject: temp2,
            sharedCosts: temp
        })
    }

    handleShareInputChange(event) {
        this.setState({ sharedName: event.target.value });
    }

    handleCostInputChange(event, i) {
        if (event.target.value.startsWith('0')) {
            event.target.value = event.target.value.slice(1);
        }
        let temp = [...this.state.sharedCosts];
        temp[i] = event.target.value
        this.setState({ sharedCosts: temp });

    }
    render() {

        return (
            <div>
                <div className={css(styles.title_container)}>
                    <div>Split Costs Calculator</div>
                    <Divider />
                </div>
                <div className={css(styles.calc_container)}>
                    <div className={css(styles.add_container)}>
                        <Button className={css(styles.button)} variant="contained" onClick={this.addShare}>Add sharedObject</Button>
                        <TextField id="outlined-basic" color="secondary" size="small" label="Name" variant="outlined" value={this.state.sharedName} onChange={this.handleShareInputChange} />
                    </div>
                    <div>
                        {
                            (this.state.sharedObject) ? this.state.sharedObject.map((c, i) => (
                                <div key={i}>
                                    <h3>{c.displayName}</h3>
                                    <div>
                                        Total Cost: {c.totalCost}
                                    </div>
                                    <div>
                                        <Button className={css(styles.button)} variant="contained" onClick={() => {
                                            this.addCost(i)
                                        }}>Add Cost</Button>
                                        <TextField id="outlined-basic" color="secondary" type="number" size="small" label="Cost" variant="outlined" value={this.state.sharedCosts[i]}
                                            onChange={(event) => {
                                                this.handleCostInputChange(event, i)
                                            }}
                                        />
                                    </div>
                                    <div className={css(styles.costs_container)}>
                                        {
                                            (this.state.sharedObject[i].costs.length > 0) ? this.state.sharedObject[i].costs.map((costsContents, costsIndex) => (
                                                <Chip color={(costsIndex % 3 == 2) ? "primary" : (costsIndex % 3 == 1) ? "secondary" : "warning"} key={costsIndex} label={'$ ' + costsContents} />
                                            )) : <div></div>
                                        }
                                    </div>
                                </div>
                            )) : <div></div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}


