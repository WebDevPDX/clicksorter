const assert = require("assert");
const { mapClicks, filterArr, createSolutionFile } = require("./sorter.js");

const it = async (desc, fn) => {
  try {
    await fn();
    console.log("\x1b[32m%s\x1b[0m", `\u2714 ${desc}`);
  } catch (error) {
    console.log("\n");
    console.log("\x1b[31m%s\x1b[0m", `\u2718 ${desc}`);
    console.error(error);
  }
};

it("should return an array if the initial file is empty", () => {
  const input = [];
  const { IPcounter, map } = mapClicks(input);
  const filteredArr = filterArr(IPcounter, map);
  const result = JSON.stringify(filteredArr);
  const expected = JSON.stringify([]);
  assert.equal(result, expected);
});

it("should return an array of objects if there is data in the correct format", () => {
  const input = [
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
  ];
  const { IPcounter, map } = mapClicks(input);
  const filteredArr = filterArr(IPcounter, map);
  const result = JSON.stringify(filteredArr);
  const expected = JSON.stringify([
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
  ]);
  assert.equal(result, expected);
});

it("should only return the most expensive click in a time period per IP", () => {
  const input = [
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
  ];
  const { IPcounter, map } = mapClicks(input);
  const filteredArr = filterArr(IPcounter, map);
  const result = JSON.stringify(filteredArr);
  const expected = JSON.stringify([
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
  ]);
  assert.equal(result, expected);
});

it("should return the earliest most expensive click if two are tied in the same time period", () => {
  const input = [
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
  ];
  const { IPcounter, map } = mapClicks(input);
  const filteredArr = filterArr(IPcounter, map);
  const result = JSON.stringify(filteredArr);
  const expected = JSON.stringify([
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
  ]);
  assert.equal(result, expected);
});

it("should not return any IP that is MORE than 10 times in the intial file", () => {
  const input = [
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "33.33.33.33", timestamp: "3/11/2020 07:02:54", amount: 15.75 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
  ];
  const { IPcounter, map } = mapClicks(input);
  const filteredArr = filterArr(IPcounter, map);
  const result = JSON.stringify(filteredArr);
  const expected = JSON.stringify([
    { ip: "33.33.33.33", timestamp: "3/11/2020 07:02:54", amount: 15.75 },
  ]);
  assert.equal(result, expected);
});

it("should return a result if the IP was 10 time in the initial file", () => {
  const input = [
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 03:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 04:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 05:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 06:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 07:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 08:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 09:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 10:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 11:13:11", amount: 7.25 },
    { ip: "33.33.33.33", timestamp: "3/11/2020 12:02:54", amount: 15.75 },
  ];
  const { IPcounter, map } = mapClicks(input);
  const filteredArr = filterArr(IPcounter, map);
  const result = JSON.stringify(filteredArr);
  const expected = JSON.stringify([
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 03:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 04:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 05:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 06:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 07:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 08:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 09:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 10:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 11:13:11", amount: 7.25 },
    { ip: "33.33.33.33", timestamp: "3/11/2020 12:02:54", amount: 15.75 },
  ]);
  assert.equal(result, expected);
});

it("should correctly return the results even if same IP clicks are separated", () => {
  const input = [
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
    { ip: "33.33.33.33", timestamp: "3/11/2020 12:02:54", amount: 15.75 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 04:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 05:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 06:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 07:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 08:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 09:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 10:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 11:13:11", amount: 7.25 },
  ];
  const { IPcounter, map } = mapClicks(input);
  const filteredArr = filterArr(IPcounter, map);
  const result = JSON.stringify(filteredArr);
  const expected = JSON.stringify([
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
    { ip: "33.33.33.33", timestamp: "3/11/2020 12:02:54", amount: 15.75 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 04:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 05:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 06:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 07:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 08:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 09:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 10:13:11", amount: 7.25 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 11:13:11", amount: 7.25 },
  ]);
  assert.equal(result, expected);
});

//more of an integration test since it was a requirement of the assignment (should not be unit tested)
it("should write the results in the resultset.json file in the correct format", async () => {
  const input = [
    { ip: "99.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
  ];
  const { IPcounter, map } = mapClicks(input);
  const filteredArr = filterArr(IPcounter, map);
  createSolutionFile(filteredArr);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(1000);
  const result = JSON.stringify(require("./resultset.json"));
  const expected = JSON.stringify([
    { ip: "99.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
  ]);
  assert.equal(result, expected);
});
