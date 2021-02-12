import states from "../constant/states";

function getAllSearchBarSuggestions(statesData) {
  if (statesData === null || statesData === undefined) return [];

  let locationsList = [];
  Object.keys(statesData).forEach((stateCode) => {
    const state = states[stateCode];

    locationsList.push({
      title: state,
      link: `/state/${stateCode}`,
      adornment: `${stateCode}  ▶`,
    });
    if (statesData[stateCode].districts !== undefined) {
      Object.keys(statesData[stateCode].districts).forEach((district) => {
        const districtName = `${district}, ${state}`;

        locationsList.push({
          title: districtName,
          link: `/state/${stateCode}`,
          adornment: `${stateCode}  ▶`,
        });
      });
    }
  });
  return locationsList;
}

export default getAllSearchBarSuggestions;
