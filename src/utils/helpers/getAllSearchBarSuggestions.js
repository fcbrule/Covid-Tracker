import states from "../constant/states";

function getAllSearchBarSuggestions(statesData) {
  if (statesData === null || statesData === undefined) return [];

  let locationsList = [];
  Object.keys(statesData).forEach((stateCode) => {
    const state = states[stateCode];

    locationsList.push({ name: state, code: stateCode });
    if (statesData[stateCode].districts !== undefined) {
      Object.keys(statesData[stateCode].districts).forEach((district) => {
        const name = `${district}, ${state}`;

        locationsList.push({ name: name, code: stateCode });
      });
    }
  });
  return locationsList;
}

export default getAllSearchBarSuggestions;
