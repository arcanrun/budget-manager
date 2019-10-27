//@flow
import React from "react";

import style from "./LineChart.module.css";
import ChartistGraph from "react-chartist";
import "./chartist.css";
import { cutNumber } from "../ShortenNumber/helpers";
import { stringToDate } from "../../helpers/datetime";
import { toPrettyNumber } from "../../helpers/prettyNumbers";

type PROPS = {
  switcher: boolean,
  history: Array<any>
};

export const LineChart = ({ switcher, history }: PROPS) => {
  let currentMonth = new Date();
  currentMonth = currentMonth.getMonth() + 1;
  const currentMonthData = [];
  history.forEach(el => {
    let month = Object.keys(el)[0];
    month = "" + stringToDate(month);
    // console.log("1)", month);

    month = +month.substr(3, 2);
    // console.log("2)", month);
    // console.log("current", currentMonth);

    if (month === currentMonth) {
      currentMonthData.push(el);
    }
  });

  currentMonthData.reverse();

  // var data = {
  //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //   series: [[1, 2, 4, 8, 6, 2, 1, 4, 6, 22, 100]]
  // };

  const dataIncome = {
    labels: [],
    series: []
  };
  const dataCosts = {
    labels: [],
    series: []
  };
  const tempSeriesIncome = [];
  const tempSeriesCosts = [];
  currentMonthData.forEach(el => {
    const key = Object.keys(el)[0];
    const day = Object.keys(el)[0].substr(0, 2);
    const dayData = el[key];
    let plus = 0;
    let minus = 0;

    dayData.forEach(item => {
      switch (item.operation) {
        case "minus":
          minus += +item.value;
          break;
        case "plus":
          plus += +item.value;
          break;
        case "transfer":
          break;
        default:
          console.warn("unknown operation in Chart");
          break;
      }
    });

    dataIncome.labels.push(day);
    tempSeriesIncome.push(plus);

    dataCosts.labels.push(day);
    tempSeriesCosts.push(minus);
  });
  dataIncome.series.push(tempSeriesIncome);
  dataCosts.series.push(tempSeriesCosts);

  let offset = 23;

  if (switcher) {
    dataIncome.series[0].forEach(el => {
      const toStr =
        "" + toPrettyNumber(el, false, 1000, false, "", "", "0.0a", "0");

      if (toStr.indexOf("k") !== -1) {
        let increment = 24;
        if (toStr.length >= 5) {
          increment = 25;
        }
        if (toStr.length >= 6) {
          increment = 26;
        }
        if (offset < increment) offset = increment;
      }
      if (toStr.indexOf("m") !== -1) {
        const increment = 26;
        if (offset < increment) offset = increment;
      }
      if (toStr.indexOf("b") !== -1 || toStr.indexOf("t") !== -1) {
        const increment = 27;
        if (offset < increment) offset = increment;
      }
    });
  } else {
    dataCosts.series[0].forEach(el => {
      const toStr =
        "" + toPrettyNumber(el, false, 1000, false, "", "", "0.0a", "0");
      if (toStr.indexOf("k") !== -1) {
        let increment = 24;
        if (toStr.length >= 5) {
          increment = 25;
        }
        if (toStr.length >= 6) {
          increment = 26;
        }
        if (offset < increment) offset = increment;
      }
      if (toStr.indexOf("m") !== -1) {
        const increment = 26;
        if (offset < increment) offset = increment;
      }
      if (toStr.indexOf("b") !== -1 || toStr.indexOf("t") !== -1) {
        const increment = 27;
        if (offset < increment) offset = increment;
      }
    });
  }

  var options = {
    low: 0,
    showArea: true,
    axisY: {
      labelInterpolationFnc: function(value) {
        return toPrettyNumber(value, false, 1000, "", "", "", "0a");
      },
      offset: offset
    },
    classNames: {
      chart: "ct-chart-line",
      label: "ct-label",
      labelGroup: "ct-labels",
      series: "ct-series",
      line: switcher ? style.greenLine : style.redLine,
      point: switcher ? style.greenPoint : style.redPoint,
      area: switcher ? style.greenArea : style.redArea,
      grid: "ct-grid",
      gridGroup: "ct-grids",
      vertical: "ct-vertical",
      horizontal: "ct-horizontal",
      start: "ct-start",
      end: "ct-end"
    }
  };

  var type = "Line";
  return (
    <div className={style.contianer}>
      {" "}
      <ChartistGraph
        // data={data}
        data={switcher ? dataIncome : dataCosts}
        options={options}
        type={type}
      />
    </div>
  );
};
