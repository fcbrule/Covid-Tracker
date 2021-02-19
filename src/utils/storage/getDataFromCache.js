import lscache from "lscache";

import { getStatesData, getUpdatesLog } from "../api/statesData";

import { formatUpdatesLog } from "../helpers";

export const getCachedStatesData = async () => {
  const statesData = lscache.get("statesData");

  if (statesData !== null) {
    return statesData;
  } else {
    try {
      const result = await getStatesData();

      lscache.set("statesData", result.data, 60);

      return result.data;
    } catch (error) {
      throw error;
    }
  }
};

export const getCachedUpdatesLog = async () => {
  const updatesLog = lscache.get("updatesLog");

  if (updatesLog !== null) {
    return updatesLog;
  } else {
    try {
      const result = await getUpdatesLog();

      const formattedUpdatesLog = formatUpdatesLog(result.data);

      lscache.set("updatesLog", formattedUpdatesLog, 60);

      return formattedUpdatesLog;
    } catch (error) {
      throw error;
    }
  }
};
