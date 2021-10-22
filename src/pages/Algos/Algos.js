import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import ShuffleIcon from '@material-ui/icons/Shuffle';

import { flash } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    bounce: {
        animationName: flash,
        animationDuration: '1s'
    },
    dark_canvas: {
        background: '#161b22',
        color: '#fff',
        width: '100px',
        height: '100px',
        padding: '10px',
        borderRadius: '10px',
        margin: '20px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})

export default class Algos extends Component {
    constructor() {
        super();
        this.state = {
            data_set: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            animation: styles.bounce,
            count: 0,
            numOne: null,
            numTwo: null
        };

        this.triggerAnimate = this.triggerAnimate.bind(this);
        this.fisher_yates_shuffle = this.fisher_yates_shuffle.bind(this);
        this.bubble_sort = this.bubble_sort.bind(this);
        this.swap = this.swap.bind(this);
    }

    fisher_yates_shuffle(index) {
        // let tempArray = [...this.state.data_set];
        let randomNum = Math.floor(Math.random() * (this.state.data_set.length - index) + index);
        this.setState({
            numOne: index,
            numTwo: randomNum
        })
        // let temp = tempArray[index];
        // tempArray[index] = tempArray[randomNum];
        // tempArray[randomNum] = temp;
        // return tempArray;

        return this.swap(index, randomNum);
    }

    bubble_sort(index) {
        this.setState({
            numOne: index,
            numTwo: index + 1
        })
        if (this.state.data_set[index] > this.state.data_set[index + 1]) {
            return this.swap(index, index + 1);
        } else {
            return this.state.data_set;
        }

    }

    swap(first, second) {
        let tempArray = [...this.state.data_set];
        let temp = tempArray[first];
        tempArray[first] = tempArray[second];
        tempArray[second] = temp;
        return tempArray;
    }
    triggerAnimate(algoFunc, funcType) {
        this.setState({ count: 0 });
        this.startAlgo(algoFunc, funcType)
    }

    startAlgo(algoFunc, funcType) {
        console.log('trigger')
        const { animation, count, data_set } = this.state;

        this.setState({
            animation: animation,
            data_set: algoFunc(count),
            count: (count == data_set.length - 1) ? 0 : count + 1
        });

        if (funcType == 0 && count === data_set.length - 1) { this.setState({ count: 0 }); return; }
        if (funcType == 1 && JSON.stringify([...this.state.data_set].sort((a, b) => a - b)) == JSON.stringify(this.state.data_set)) return;
        // TODO: bug with after sorting, shuffle doesnt start at beginning
        setTimeout(() => {
            this.startAlgo(algoFunc, funcType)
        }, 1000);

    }
    render() {
        const { animation } = this.state;
        let displayData = [];
        this.state.data_set.forEach((c, i) => {
            // key={Math.random()} => to trigger animations after first render
            displayData.push(<div key={Math.random()} className={css((i == this.state.numOne || i == this.state.numTwo) ? animation : '', styles.dark_canvas)}>{c}</div>)
        })
        return (
            <div>
                <div>
                    <div className={css(styles.container)}>
                        {displayData}
                    </div>
                    <Button onClick={() => { this.triggerAnimate(this.fisher_yates_shuffle, 0) }}
                        variant="contained"
                        color="primary"
                        startIcon={<ShuffleIcon />}>
                        Fisher Yates Shuffle
                    </Button>
                    <Button onClick={() => { this.triggerAnimate(this.bubble_sort, 1) }}
                        variant="contained"
                        color="primary"
                        startIcon={<ShuffleIcon />}>
                        Bubble Sort
                    </Button>
                </div>
            </div>
        )
    }
}
