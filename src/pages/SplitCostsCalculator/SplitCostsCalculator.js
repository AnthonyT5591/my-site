import React, { Component } from 'react'
import privateData from '../../private/secret.json'

import {
    Divider,
    Button,
    TextField,
    Chip
} from "@mui/material";

import { StyleSheet, css } from "aphrodite";
import { green, red } from '@mui/material/colors';

const styles = StyleSheet.create({
    title_container: {
        marginBottom: "10px",
    },
    calc_container: {
        borderRadius: "10px",
    },
    add_container: {
        display: "flex",
        alignItems: "center",
        padding: "20px 0px",
        borderBottom: "1px solid white",
        justifyContent: 'space-between'
    },
    totalCosts_container: {
        marginBottom: "10px"
    },
    costs_container: {
        display: "flex",
        marginTop: "10px",
        flexWrap: "wrap"
    },
    shared_container: {
        borderBottom: "1px solid white",
        padding: "20px 0px"
    },
    two_panel_container: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
    },
    split_costs_container: {
        textAlign: "right",
        padding: "20px"
    },
    shared_costs_container: {
        width: "70%"
    },
    chip: {
        margin: "5px"
    },
    button: {
        margin: "0px 10px 0px 0px"
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
    },
    success: {
        color: green.A400
    },
    error: {
        color: red.A400
    }
});
export default class SplitCostsCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sharedObject: [],
            sharedName: '',
            sharedCosts: [],
            totalAllCost: ''
        }

        this.handleShareInputChange = this.handleShareInputChange.bind(this);
        this.handleCostInputChange = this.handleCostInputChange.bind(this);
        this.addShare = this.addShare.bind(this);
        this.addCost = this.addCost.bind(this);
        this.clearData = this.clearData.bind(this);
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
    }

    addCost(index) {
        let temp = [...this.state.sharedCosts];
        let temp2 = [...this.state.sharedObject];
        const formattedSharedCost = Number(temp[index]).toFixed(2);
        const formattedTotalCost = Number(temp2[index].totalCost).toFixed(2);

        temp2[index].totalCost = +formattedSharedCost + +formattedTotalCost;
        temp2[index].costs.push(+formattedSharedCost)
        temp[index] = 0;

        this.setState({
            sharedObject: temp2,
            sharedCosts: temp
        })
    }

    clearData() {
        this.setState({
            sharedObject: [],
            sharedName: '',
            sharedCosts: [],
            totalAllCost: ''
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
        let total = 0;
        this.state.sharedObject.forEach(c => {
            total += c.totalCost;
        });
        return (
            <div>
                <div className={css(styles.title_container)}>
                    <div>Split Costs Calculator</div>
                    <Divider />
                </div>
                <div className={css(styles.calc_container)}>
                    <div className={css(styles.add_container)}>
                        <div>
                            <Button className={css(styles.button)} disabled={!this.state.sharedName} color="primary" variant="contained" onClick={this.addShare}>Add Individual/Shared Group</Button>
                            <TextField id="outlined-basic" color="secondary" size="small" label="Name" variant="outlined" value={this.state.sharedName} onChange={this.handleShareInputChange} />
                        </div>
                        <div>
                            <Button className={css(styles.button)} color="secondary" variant="contained" onClick={this.clearData}>Clear</Button>
                        </div>
                    </div>
                    <div className={css(styles.two_panel_container)}>
                        <div className={css(styles.shared_costs_container)}>
                            {
                                (this.state.sharedObject) ? this.state.sharedObject.map((c, i) => (
                                    <div key={i} className={css(styles.shared_container)}>
                                        <h3>{c.displayName}</h3>
                                        <div className={css(styles.totalCosts_container)}>
                                            Total Individual Cost: $ {c.totalCost}
                                        </div>
                                        <div>
                                            <Button className={css(styles.button)}
                                                variant="contained"
                                                disabled={this.state.sharedCosts[i] <= 0}
                                                onClick={() => {
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
                                                    <Chip key={costsIndex} className={css(styles.chip)} color={(+costsContents > 1000) ? "info" : (+costsContents > 499) ? "warning" : (+costsContents > 99) ? "secondary" : "primary"} label={'$ ' + costsContents} />
                                                )) : <div></div>
                                            }
                                        </div>
                                    </div>
                                )) : <div></div>
                            }
                        </div>
                        <div className={css(styles.split_costs_container)}>
                            <p>Total Cost: $ {total.toFixed(2)}</p>
                            <p>Split Even ({this.state.sharedObject.length}): $ {(this.state.sharedObject.length > 1) ? (total / this.state.sharedObject.length).toFixed(2) : '0.00'}</p>
                            {
                                (total > 0 && this.state.sharedObject.length > 1) ? this.state.sharedObject.map((c, i) => {
                                    if (c.totalCost > (total / this.state.sharedObject.length)) {
                                        return (
                                            <p key={i}>{c.displayName} is <span className={css(styles.success)}>owed</span> $ {(((total / this.state.sharedObject.length) - c.totalCost) * -1).toFixed(2)}</p>
                                        )
                                    } else {
                                        return (
                                            <p key={i}>{c.displayName} <span className={css(styles.error)}>owes</span> $ {((total / this.state.sharedObject.length) - c.totalCost).toFixed(2)}</p>
                                        )
                                    }
                                }) : <div></div>
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


