import states from "../constant/states";
export function getRelativeTime(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return "About " + Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "About " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
  }
}

export function formatUpdatesLog(updatesLog) {
  if (updatesLog.length === 0) return {};
  updatesLog.reverse();
  let updates = {};
  const currentTimestamp = +new Date();
  updatesLog.map((updateObject) => {
    let { timestamp, update } = updateObject;
    const dateObject = new Date(timestamp * 1000);
    const relativeTime = getRelativeTime(currentTimestamp, timestamp * 1000);
    const date = dateObject.getDate();
    const month = dateObject.toLocaleString("default", { month: "short" });
    const fullDate = `${date} ${month}`;
    if (updates[fullDate] === undefined) {
      updates[fullDate] = {};
    }
    if (updates[fullDate][relativeTime] === undefined) {
      updates[fullDate][relativeTime] = [];
    }

    const refactoredUpdates = update.split("\n");
    refactoredUpdates.pop();
    updates[fullDate][relativeTime] = refactoredUpdates;

    // refactoredUpdates.map((update))
  });

  return updates;
}

export function getAllSearchBarSuggestions(statesData) {
  if (statesData === null || statesData === undefined) return [];

  let locationsList = [];
  Object.keys(statesData).forEach((stateCode) => {
    const state = states[stateCode];

    let link = "";
    if (stateCode === "TT") {
      link = "/";
    } else {
      link = `/state/${stateCode}`;
    }

    locationsList.push({
      title: state,
      link: link,
      adornment: `${stateCode}  ▶`,
    });

    if (statesData[stateCode].districts !== undefined) {
      Object.keys(statesData[stateCode].districts).forEach((district) => {
        if (district !== state) {
          const districtFullName = `${district}, ${state}`;

          locationsList.push({
            title: districtFullName,
            link: `/state/${stateCode}`,
            adornment: `${stateCode}  ▶`,
          });
        }
      });
    }
  });
  return locationsList;
}

export function getLocationStats(statesData, stateCode) {
  if (Object.keys(statesData).length === 0 || statesData === undefined)
    return [];
  if (statesData[stateCode] === undefined) return [];
  if (statesData[stateCode].total === undefined) return [];

  const confirmedCount =
    statesData[stateCode].total.confirmed === undefined
      ? 0
      : statesData[stateCode].total.confirmed;

  const recoveredCount =
    statesData[stateCode].total.recovered === undefined
      ? 0
      : statesData[stateCode].total.recovered;

  const deceasedCount =
    statesData[stateCode].total.deceased === undefined
      ? 0
      : statesData[stateCode].total.deceased;

  const confirmedChange =
    statesData[stateCode].delta !== undefined
      ? statesData[stateCode].delta.confirmed
      : undefined;

  const recoveredChange =
    statesData[stateCode].delta !== undefined
      ? statesData[stateCode].delta.recovered
      : undefined;

  const deceasedChange =
    statesData[stateCode].delta !== undefined
      ? statesData[stateCode].delta.deceased
      : undefined;

  const activeCount = confirmedCount - deceasedCount - recoveredCount;

  return [
    { type: "Confirmed", count: confirmedCount, change: confirmedChange },
    { type: "Active", count: activeCount },
    { type: "Recovered", count: recoveredCount, change: recoveredChange },
    { type: "Deceased", count: deceasedCount, change: deceasedChange },
  ];
}

export function getTableRows(statesData, stateCode) {
  if (Object.keys(statesData).length === 0 || statesData === undefined)
    return [];
  let rows = [];
  if (stateCode === "TT") {
    Object.keys(statesData).forEach((state) => {
      if (state !== "TT") {
        let confirmedCount,
          recoveredCount,
          deceasedCount,
          testedCount,
          confirmedChange,
          recoveredChange,
          deceasedChange,
          testedChange;
        if (statesData[state].total !== undefined) {
          const { confirmed, recovered, deceased, tested } = statesData[
            state
          ].total;
          confirmedCount = confirmed === undefined ? 0 : confirmed;
          recoveredCount = recovered === undefined ? 0 : recovered;
          deceasedCount = deceased === undefined ? 0 : deceased;
          testedCount = tested === undefined ? 0 : tested;
        }

        if (statesData[state].delta !== undefined) {
          const { confirmed, recovered, deceased, tested } = statesData[
            state
          ].delta;
          confirmedChange = confirmed === undefined ? 0 : confirmed;
          recoveredChange = recovered === undefined ? 0 : recovered;
          deceasedChange = deceased === undefined ? 0 : deceased;
          testedChange = tested === undefined ? 0 : tested;
        }

        const activeCount = confirmedCount - deceasedCount - recoveredCount;
        const row = [
          states[state],
          [confirmedCount, confirmedChange],
          activeCount,
          [recoveredCount, recoveredChange],
          [deceasedCount, deceasedChange],
          [testedCount, testedChange],
        ];

        rows.push(row);
      }
    });
    if (
      statesData["TT"] !== undefined &&
      statesData["TT"].delta !== undefined
    ) {
      const { confirmed, recovered, deceased, tested } = statesData["TT"].total;
      const confirmedChange = statesData["TT"].delta.confirmed,
        recoveredChange = statesData["TT"].delta.recovered,
        deceasedChange = statesData["TT"].delta.deceased,
        testedChange = statesData["TT"].delta.tested;
      const active = confirmed - deceased - recovered;
      const indiaRow = [
        "India",
        [confirmed, confirmedChange],
        active,
        [recovered, recoveredChange],
        [deceased, deceasedChange],
        [tested, testedChange],
      ];
      rows.push(indiaRow);
    }
  } else {
    if (statesData[stateCode] === undefined) return [];

    Object.keys(statesData[stateCode].districts).forEach((district) => {
      if (district !== "Unknown") {
        let confirmedCount,
          recoveredCount,
          deceasedCount,
          testedCount,
          confirmedChange,
          recoveredChange,
          deceasedChange,
          testedChange;
        if (statesData[stateCode].districts[district].total !== undefined) {
          const { confirmed, recovered, deceased, tested } = statesData[
            stateCode
          ].districts[district].total;
          confirmedCount = confirmed === undefined ? "-" : confirmed;
          recoveredCount = recovered === undefined ? 0 : recovered;
          deceasedCount = deceased === undefined ? 0 : deceased;
          testedCount = tested === undefined ? "-" : tested;
        }
        if (statesData[stateCode].districts[district].delta !== undefined) {
          const { confirmed, recovered, deceased, tested } = statesData[
            stateCode
          ].districts[district].delta;
          confirmedChange = confirmed === undefined ? 0 : confirmed;
          recoveredChange = recovered === undefined ? 0 : recovered;
          deceasedChange = deceased === undefined ? 0 : deceased;
          testedChange = tested === undefined ? 0 : tested;
        }
        let activeCount = confirmedCount - deceasedCount - recoveredCount;
        if (Number.isNaN(activeCount)) activeCount = "-";
        const row = [
          district,
          [confirmedCount, confirmedChange],
          activeCount,
          [recoveredCount, recoveredChange],
          [deceasedCount, deceasedChange],
          [testedCount, testedChange],
        ];
        rows.push(row);
      }
    });
  }
  console.log(rows);
  return rows;
}
export function insertCommasInNumbers(number) {
  if (number === undefined) return "";
  return number.toLocaleString("hi-IN");
}

export function compareBy(key, isAscending) {
  return function (a, b) {
    if (a[0] === "India") return 1;
    if (b[0] === "India") return -1;
    if (Array.isArray(a[key])) {
      const aVal = a[key][0] === "-" ? 0 : a[key][0];
      const bVal = b[key][0] === "-" ? 0 : b[key][0];
      if (aVal < bVal) return isAscending ? -1 : 1;
      if (aVal > bVal) return isAscending ? 1 : -1;
    } else {
      const aVal = a[key] === "-" ? 0 : a[key];
      const bVal = b[key] === "-" ? 0 : b[key];
      if (aVal < bVal) return isAscending ? -1 : 1;
      if (aVal > bVal) return isAscending ? 1 : -1;
    }

    return 0;
  };
}

export function sortTable(columnNumber, isAscending, rows) {
  rows.sort(compareBy(columnNumber, isAscending));
  return rows;
}

export function handleError(error) {
  return (
    <div>
      {error.name} : {error.message}
    </div>
  );
}

export function checkError(possibleErrorObject) {
  if (possibleErrorObject.name === "Error") return true;
  else return false;
}
