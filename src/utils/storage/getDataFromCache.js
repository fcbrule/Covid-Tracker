import lscache from "lscache";

import { getStatesData, getUpdatesLog } from "../api/statesData";

import { formatUpdatesLog } from "../helpers";

export const getCachedStatesData = async () => {
  const statesData = lscache.get("statesData");
  if (statesData !== null) {
    return statesData;
  } else {
    const result = await getStatesData();

    if (result.name === "Error") {
      return result;
    }

    lscache.set("statesData", result.data, 60);
    return result.data;
  }
};

export const getCachedUpdatesLog = async () => {
  const updatesLog = lscache.get("updatesLog");

  if (updatesLog !== null) {
    return updatesLog;
  } else {
    const result = await getUpdatesLog();
    if (result.name === "Error") {
      return result;
    }

    const formattedUpdatesLog = formatUpdatesLog(result.data);

    lscache.set("updatesLog", formattedUpdatesLog, 60);
    return formattedUpdatesLog;
  }
};
