const FileSystem = require("fs");
const jsonData = require("./clicks.json");

const clicks = JSON.parse(jsonData);

const mapClicks = (clicksArr) => {
  const IPcounter = {};
  const map = clicksArr.reduce((state, elem) => {
    if (IPcounter[elem.ip]) {
      IPcounter[elem.ip] += 1;
    } else {
      IPcounter[elem.ip] = 1;
    }

    const hour = new Date(elem.timestamp).getHours();
    const key = `${elem.ip}${hour}`;

    let last = state.get(key);

    if (!last) {
      state.set(key, elem);
      return state;
    }

    if (last.amount < elem.amount) {
      state.set(key, elem);
      return state;
    }
    // } else if (
    //   last.amount === elem.amount &&
    //   new Date(elem.timestamp) < new Date(last.timestamp)
    // ) {
    //   state.set(key, elem);
    // }
    return state;
  }, new Map());
  return { IPcounter, map };
};

//filter results for 10 or more IP occurrences
const filterArr = (IPcounter, map) =>
  Array.from(map.values()).filter((click) => {
    if (IPcounter[click.ip] <= 10) {
      return click;
    }
  });

//write result to resultset.json file
const createSolutionFile = async (filteredArr) => {
  return await FileSystem.writeFile(
    "resultset.json",
    JSON.stringify(filteredArr),
    (error) => {
      if (error) throw error;
    }
  );
};

const sortClicks = (clicksArr) => {
  const { IPcounter, map } = mapClicks(clicksArr);
  const filteredArr = filterArr(IPcounter, map);
  createSolutionFile(filteredArr);
};

module.exports = {
  mapClicks,
  filterArr,
  createSolutionFile,
  sortClicks,
};
