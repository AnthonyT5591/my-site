import React, { Component } from "react";
import {
  Button,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CircularProgress from "@mui/material/CircularProgress";
import { Flipper, Flipped } from "react-flip-toolkit";

import { flash } from "react-animations";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  bounce: {
    animationName: flash,
    animationDuration: "2s",
  },
  horizontal_bar_graph: {
    background: "#161b22",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    margin: "20px 0px",
  },
  dark_box: {
    background: "#161b22",
    color: "#fff",
    width: "100px",
    height: "100px",
    padding: "10px",
    borderRadius: "10px",
    margin: "20px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    margin: "5px",
  },
});

export default class Algos extends Component {
  constructor() {
    super();
    this.state = {
      dataSet: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      animation: styles.bounce,
      count: 0,
      numOne: null,
      numTwo: null,
      selectedRadio: "dark_box",
      doinThings: false,
    };

    this.triggerAnimate = this.triggerAnimate.bind(this);
    this.fisher_yates_shuffle = this.fisher_yates_shuffle.bind(this);
    this.bubble_sort = this.bubble_sort.bind(this);
    this.swap = this.swap.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  fisher_yates_shuffle(index) {
    let randomNum = Math.floor(
      Math.random() * (this.state.dataSet.length - index) + index
    );
    this.setState({
      numOne: index,
      numTwo: randomNum,
    });
    return this.swap(index, randomNum);
  }

  bubble_sort(index) {
    this.setState({
      numOne: index,
      numTwo: index + 1,
    });
    if (this.state.dataSet[index] > this.state.dataSet[index + 1]) {
      return this.swap(index, index + 1);
    } else {
      return [...this.state.dataSet];
    }
  }

  swap(first, second) {
    let tempArray = [...this.state.dataSet];
    let temp = tempArray[first];
    tempArray[first] = tempArray[second];
    tempArray[second] = temp;
    return tempArray;
  }
  triggerAnimate(algoFunc, funcType) {
    this.setState({ count: 0, doinThings: true });
    this.startAlgo(algoFunc, funcType);
  }
  isSorted(data) {
    return (
      JSON.stringify([...data].sort((a, b) => a - b)) ==
      JSON.stringify([...data])
    );
  }
  startAlgo(algoFunc, funcType) {
    const { animation, count, dataSet } = this.state;

    this.setState({
      animation: animation,
      dataSet: algoFunc(count),
      count: count == dataSet.length - 1 ? 0 : count + 1,
    });

    // reset values after completing sort or shuffle
    if (
      (funcType == 0 && count === dataSet.length - 1) ||
      (funcType == 1 && this.isSorted(this.state.dataSet))
    ) {
      this.setState({
        count: 0,
        numOne: null,
        numTwo: null,
        doinThings: false,
      });
      return;
    }
    // TODO: bug with after sorting, shuffle doesnt start at beginning
    setTimeout(() => {
      this.startAlgo(algoFunc, funcType);
    }, 2000);
  }

  handleRadioChange(event) {
    this.setState({
      selectedRadio: event.target.value,
    });
  }
  render() {
    const { animation, numOne, numTwo, selectedRadio, dataSet, doinThings } =
      this.state;
    const sorted = this.isSorted(dataSet);
    let displayData = [];
    this.state.dataSet.forEach((c, i) => {
      // key={Math.random()} => to trigger animations after first render
      displayData.push(
        <Flipped key={Math.random()} flipId={c}>
          <div
            className={css(
              i == numOne || i == numTwo ? animation : "",
              //   styles.dark_box
              selectedRadio == "dark_box"
                ? styles.dark_box
                : styles.horizontal_bar_graph
            )}
            style={{ width: `${(c / dataSet.length) * 100}%` }}
          >
            {c}
          </div>
        </Flipped>
      );
    });
    return (
      <div>
        <div>
          <div>{sorted ? "SORTED" : "NOT SORTED"}</div>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Presentation</FormLabel>
              <RadioGroup
                row
                aria-label="presentation"
                name="controlled-radio-buttons-group"
                value={selectedRadio}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel
                  value="dark_box"
                  control={<Radio />}
                  label="Dark Box"
                />
                <FormControlLabel
                  value="horizontal_bar_graph"
                  control={<Radio />}
                  label="horizontal_bar_graph"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <Flipper
              flipKey={dataSet.join("")}
              className={
                selectedRadio == "dark_box" ? css(styles.container) : ""
              }
            >
              {displayData}
            </Flipper>
          </div>
          <div>
            <Button
              onClick={() => {
                this.triggerAnimate(this.fisher_yates_shuffle, 0);
              }}
              variant="contained"
              color="primary"
              startIcon={
                doinThings ? (
                  <CircularProgress
                    style={{ width: "15px", height: "15px" }}
                    color="inherit"
                  />
                ) : (
                  <ShuffleIcon />
                )
              }
              className={css(styles.button)}
              disabled={!sorted || doinThings ? true : false}
            >
              Fisher Yates Shuffle
            </Button>
            <Button
              onClick={() => {
                this.triggerAnimate(this.bubble_sort, 1);
              }}
              variant="contained"
              color="primary"
              startIcon={
                doinThings ? (
                  <CircularProgress
                    style={{ width: "15px", height: "15px" }}
                    color="inherit"
                  />
                ) : (
                  <ShuffleIcon />
                )
              }
              className={css(styles.button)}
              disabled={sorted || doinThings ? true : false}
            >
              Bubble Sort
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
