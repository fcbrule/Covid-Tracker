import states from "../constant/states";

function getTableRows(statesData, stateCode) {
  if (statesData === {}) return [];
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
    if (statesData["TT"] !== undefined && states["TT"].delta !== undefined) {
      const { confirmed, recovered, deceased, tested } = statesData["TT"].delta;
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
  return rows;
}

export default getTableRows;
