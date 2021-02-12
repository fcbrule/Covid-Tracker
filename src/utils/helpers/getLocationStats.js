function getLocationStats(statesData, stateCode) {
  if (Object.keys(statesData).length === 0 || statesData === undefined)
    return [];
  if (statesData[stateCode] === undefined) return [];
  if (statesData[stateCode].total === undefined) return [];
  const confirmedCount = statesData[stateCode].total.confirmed,
    recoveredCount = statesData[stateCode].total.recovered,
    deceasedCount = statesData[stateCode].total.deceased;
  let confirmedChange, recoveredChange, deceasedChange;
  if (statesData[stateCode].delta !== undefined) {
    confirmedChange = statesData[stateCode].delta.confirmed;
    recoveredChange = statesData[stateCode].delta.recovered;
    deceasedChange = statesData[stateCode].delta.deceased;
  }

  const activeCount = confirmedCount - deceasedCount - recoveredCount;

  return [
    { type: "Confirmed", count: confirmedCount, change: confirmedChange },
    { type: "Active", count: activeCount },
    { type: "Recovered", count: recoveredCount, change: recoveredChange },
    { type: "Deceased", count: deceasedCount, change: deceasedChange },
  ];
}

export default getLocationStats;
