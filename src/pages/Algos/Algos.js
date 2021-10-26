import React, { Component } from "react";
import {
  Button,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";

// icons for buttons and chips
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

// icons used to display data
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import AndroidIcon from "@mui/icons-material/Android";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import BoltIcon from "@mui/icons-material/Bolt";
import BuildIcon from "@mui/icons-material/Build";
import CakeIcon from "@mui/icons-material/Cake";

import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import { Flipper, Flipped } from "react-flip-toolkit";

import { withTheme } from '@mui/styles';
import { flash } from "react-animations";
import { StyleSheet, css } from "aphrodite";


const styles = StyleSheet.create({
  animation: {
    animationName: flash,
    animationDuration: "1s",
  },
  vertical_bar_graph: {
    padding: "5px",
    borderRadius: "10px",
    // margin: "1px",
    margin: ".5px",
    minWidth: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontal_bar_graph: {
    // padding: "5px 10px",
    padding: "0px 10px",
    borderRadius: "10px",
    margin: "1px 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title_container: {
    marginBottom: "20px",
  },
  status_container: {
    marginBottom: "10px",
  },
  general_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
  display_container: {
    height: 'auto',
    marginBottom: "20px",
  },
  options_container: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  vertical_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    height: "25rem",
    overflowX: 'auto'
  },
  button_container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    margin: "5px",
  },
  align_items: {
    display: "flex",
    alignItems: "center",
  },
  chips: {
    margin: "2px",
  },
  progressBar: {
    marginBottom: "20px",
  },
});

const _colors = {
  default: {
    text: "Default",
    value: "default",
    colors: [
      {
        main: "#161b22",
        accent: "#fff",
      },
    ],
  },
  pastel: {
    text: "Pastel",
    value: "pastel",
    colors: [
      {
        main: "#fea3aa",
        accent: "#a3fef7",
      },
      {
        main: "#baed91",
        accent: "#c491ed",
      },
      {
        main: "#f8b88b",
        accent: "#8bcbf8",
      },
      {
        main: "#b2cefe",
        accent: "#fee2b2",
      },
      {
        main: "#faf884",
        accent: "#8486fa",
      },
      {
        main: "#f2a2e8",
        accent: "#a2f2ac",
      },
    ],
  },
};

const _icons = [
  <CoronavirusIcon fontSize="small" />,
  <AccountBoxIcon fontSize="small" />,
  <AirplanemodeActiveIcon fontSize="small" />,
  <AirportShuttleIcon fontSize="small" />,
  <AllInclusiveIcon fontSize="small" />,
  <AndroidIcon fontSize="small" />,
  <BedtimeIcon fontSize="small" />,
  <BoltIcon fontSize="small" />,
  <BuildIcon fontSize="small" />,
  <CakeIcon fontSize="small" />,
];
class Algos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfCases: 15,
      delay: 1000,
      dataSet: [],
      animation: styles.animation,
      count: 0,
      numOne: null,
      numTwo: null,
      selectedPresentationRadio: "vertical_bar_graph",
      selectedColorRadio: "default",
      doinThings: false,
      currentAlgo: "",
      currentAlgoIcon: null,
      currentAlgoColor: null,
      _algos: [
        {
          text: "Fisher Yates Shuffle",
          func: (index, dataArray) => {
            let randomNum = Math.floor(
              Math.random() * (dataArray.length - index) + index
            );

            let returnObj = {
              numOne: index,
              numTwo: randomNum,
              dataSet: this.swap(index, randomNum)
            }
            return returnObj;
          },
          type: 0, // 0 for shuffle, 1 for sort
          icon: <ShuffleIcon />,
          color: "info",
          disabledCondition: (sorted, doinThings) => {
            return !sorted || doinThings ? true : false;
          },
        },
        {
          text: "Bubble Sort",
          func: (index, dataArray) => {
            let returnObj = {
              numOne: null,
              numTwo: null,
              dataSet: dataArray
            }
            if (index === dataArray.length - 1)
              return returnObj;

            returnObj = {
              numOne: index,
              numTwo: index + 1,
              dataSet: (dataArray[index] > dataArray[index + 1]) ? this.swap(index, index + 1) : [...dataArray]
            }
            return returnObj
          },
          type: 1,
          icon: <BubbleChartOutlinedIcon />,
          color: "secondary",
          disabledCondition: (sorted, doinThings) => {
            return sorted || doinThings ? true : false;
          },
        },
        {
          text: "Selection Sort",
          func: (index, dataArray) => {
            let minNumIndex = index;
            for (let i = index; i < dataArray.length; i++) {
              if (dataArray[minNumIndex] > dataArray[i]) {
                minNumIndex = i;
              }
            }

            const returnObj = {
              numOne: index,
              numTwo: minNumIndex,
              dataSet: this.swap(index, minNumIndex)
            }

            return returnObj;
          },
          type: 1,
          icon: <TouchAppOutlinedIcon />,
          color: "secondary",
          disabledCondition: (sorted, doinThings) => {
            return sorted || doinThings ? true : false;
          },
        },
        {
          text: "Insert Sort",
          func: (index, dataArray) => {
            let returnObj = {
              numOne: null,
              numTwo: null,
              dataSet: dataArray
            }
            if (index === 0) return returnObj;

            let insertIndex = index;
            for (let i = index; i >= 0; i--) {
              if (dataArray[i - 1] > dataArray[index]) {
                insertIndex = i - 1;
              }
            }
            let returnArray = [...dataArray];

            // insert then delete
            returnArray.splice(insertIndex, 0, dataArray[index]);
            returnArray.splice(index + 1, 1);

            returnObj = {
              numOne: insertIndex - 1,
              numTwo: insertIndex,
              dataSet: returnArray
            }
            return returnObj;
          },
          type: 1,
          icon: <AddCircleOutlineOutlinedIcon />,
          color: "secondary",
          disabledCondition: (sorted, doinThings) => {
            return sorted || doinThings ? true : false;
          },
        },
      ],
      _presentations: {
        vertical_bar_graph: {
          container_styles: styles.vertical_container,
          element_styles: styles.vertical_bar_graph,
          calculated_styles: (c, dataSet) => {
            return {
              background: `${_colors[this.state.selectedColorRadio].colors[
                c % _colors[this.state.selectedColorRadio].colors.length
              ].main
                }`,
              color: `${_colors[this.state.selectedColorRadio].colors[
                c % _colors[this.state.selectedColorRadio].colors.length
              ].accent
                }`,
              minHeight: `${(c / dataSet.length) * 100}%`,
            };
          },
          text: "Vertical",
          value: "vertical_bar_graph",
        },
        horizontal_bar_graph: {
          container_styles: styles.general_container,
          element_styles: styles.horizontal_bar_graph,
          calculated_styles: (c, dataSet) => {
            return {
              background: `${_colors[this.state.selectedColorRadio].colors[
                c % _colors[this.state.selectedColorRadio].colors.length
              ].main
                }`,
              color: `${_colors[this.state.selectedColorRadio].colors[
                c % _colors[this.state.selectedColorRadio].colors.length
              ].accent
                }`,
              minWidth: `${(c / dataSet.length) * 100}%`,
            };
          },
          text: "Horizontal",
          value: "horizontal_bar_graph",
        },
      },
    };

    this.triggerAnimate = this.triggerAnimate.bind(this);
    this.swap = this.swap.bind(this);
    this.handlePresentationRadioChange =
      this.handlePresentationRadioChange.bind(this);
    this.handleColorRadioChange = this.handleColorRadioChange.bind(this);
  }

  componentDidMount() {
    let tempSet = [];
    for (let i = 1; i <= this.state.numberOfCases; i++) {
      tempSet.push(i);
    }
    this.setState({
      dataSet: tempSet,
    });
  }

  swap(first, second) {
    let tempArray = [...this.state.dataSet];
    let temp = tempArray[first];
    tempArray[first] = tempArray[second];
    tempArray[second] = temp;
    return tempArray;
  }

  triggerAnimate(algoFunc, funcType, displayName, algoIcon, algoColor) {
    this.setState({
      count: 0,
      doinThings: true,
      currentAlgo: displayName,
      currentAlgoIcon: algoIcon,
      currentAlgoColor: algoColor,
    });

    this.startAlgo(algoFunc, funcType);
  }

  isSorted(data) {
    return (
      JSON.stringify([...data].sort((a, b) => a - b)) ===
      JSON.stringify([...data])
    );
  }

  startAlgo(algoFunc, funcType) {
    const { animation, count, dataSet } = this.state;

    // reset values after completing sort or shuffle
    if (
      (funcType === 0 && count === dataSet.length - 1) ||
      (funcType === 1 && this.isSorted(dataSet))
    ) {
      this.setState({
        count: 0,
        numOne: null,
        numTwo: null,
        doinThings: false,
        currentAlgo: null,
      });
      return;
    }
    let algoResult = algoFunc(count, [...dataSet]);
    this.setState({
      animation: animation,
      numOne: algoResult.numOne,
      numTwo: algoResult.numTwo,
      dataSet: algoResult.dataSet,
      count: count === dataSet.length - 1 ? 0 : count + 1,
    });

    // TODO: bug with after sorting, shuffle doesnt start at beginning
    setTimeout(() => {
      this.startAlgo(algoFunc, funcType);
    }, this.state.delay);
  }

  handlePresentationRadioChange(event) {
    this.setState({
      selectedPresentationRadio: event.target.value,
    });
  }

  handleColorRadioChange(event) {
    this.setState({
      selectedColorRadio: event.target.value,
    });
  }

  render() {
    const {
      animation,
      numOne,
      numTwo,
      selectedPresentationRadio,
      selectedColorRadio,
      dataSet,
      doinThings,
      currentAlgo,
      currentAlgoIcon,
      currentAlgoColor,
      _presentations,
    } = this.state;
    // const { theme } = this.props;
    const sorted = this.isSorted(dataSet);

    let displayData = [];
    this.state.dataSet.forEach((c, i) => {
      // key={Math.random()} => to trigger animations after first render
      displayData.push(
        <Flipped key={Math.random()} flipId={c}>
          <div
            className={css(
              i === numOne || i === numTwo ? animation : "",
              _presentations[selectedPresentationRadio].element_styles
            )}
            style={_presentations[selectedPresentationRadio].calculated_styles(
              c,
              dataSet
            )}
          >
            {c}
            {_icons[c % _icons.length]}
          </div>
        </Flipped>
      );
    });

    let algoButtons = [];
    this.state._algos.forEach((c) => {
      algoButtons.push(
        <Button
          key={c.text}
          onClick={() => {
            this.triggerAnimate(c.func, c.type, c.text, c.icon, c.color);
          }}
          variant="contained"
          color={c.color}
          startIcon={c.icon}
          className={css(styles.button)}
          disabled={c.disabledCondition(sorted, doinThings)}
        >
          {c.text}
        </Button>
      );
    });

    let presentationRadios = [];
    for (const item in _presentations) {
      let c = _presentations[item];
      presentationRadios.push(
        <FormControlLabel
          key={c.text}
          value={c.value}
          control={<Radio />}
          label={c.text}
        />
      );
    }

    let colorRadios = [];
    for (const item in _colors) {
      let c = _colors[item];
      colorRadios.push(
        <FormControlLabel
          key={c.text}
          value={c.value}
          control={<Radio />}
          label={c.text}
        />
      );
    }
    return (
      <div>
        <div className={css(styles.title_container)}>
          <div>Algo Visualizer</div>
          <Divider />
        </div>
        <div className={css(styles.status_container)}>
          {sorted ? (
            <Chip
              className={css(styles.chips)}
              color="success"
              icon={<CheckCircleOutlinedIcon />}
              label="Sorted"
            />
          ) : (
            <Chip
              className={css(styles.chips)}
              color="warning"
              icon={<ErrorOutlineOutlinedIcon />}
              label="Not Sorted"
            />
          )}
          {currentAlgo ? (
            <Chip
              className={css(styles.chips)}
              color={currentAlgoColor}
              icon={currentAlgoIcon}
              label={currentAlgo}
            />
          ) : (
            <div></div>
          )}
        </div>
        {currentAlgo ? (
          <LinearProgress
            className={css(styles.progressBar)}
            color={currentAlgoColor}
          />
        ) : (
          <div></div>
        )}
        <div className={css(styles.options_container)}>
          <div>
            <FormControl style={{ marginRight: "40px" }} component="fieldset">
              <FormLabel component="legend" style={{ color: "#00e676" }}>
                Presentation
              </FormLabel>
              <RadioGroup
                row
                aria-label="presentation"
                name="controlled-radio-buttons-group"
                value={selectedPresentationRadio}
                onChange={this.handlePresentationRadioChange}
              >
                {presentationRadios}
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl style={{ marginRight: "40px" }} component="fieldset">
              <FormLabel component="legend" style={{ color: "#00e676" }}>
                Color
              </FormLabel>
              <RadioGroup
                row
                aria-label="color"
                name="controlled-radio-buttons-group"
                value={selectedColorRadio}
                onChange={this.handleColorRadioChange}
              >
                {colorRadios}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={css(styles.display_container)}>
          <Flipper
            flipKey={dataSet.join("")}
            className={css(
              _presentations[selectedPresentationRadio].container_styles
            )}
          >
            {displayData}
          </Flipper>
        </div>
        <div className={css(styles.button_container)}>{algoButtons}</div>
      </div>
    );
  }
}

export default withTheme(Algos)