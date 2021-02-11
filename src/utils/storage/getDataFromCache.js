import lscache from "lscache";
import { getStatesData, getUpdatesLog } from "../api/statesData";
import formatUpdatesLog from "../helpers/formatUpdatesLog";

export const getCachedStatesData = async () => {
  const statesData = lscache.get("statesData");
  // console.log(statesData);
  if (statesData !== null) {
    console.log(statesData);
    return statesData;
  } else {
    await getStatesData().then((result) => {
      lscache.set("statesData", result.data, 60);
      return result.data;
    });
  }
};

export const getCachedUpdatesLog = async () => {
  const updatesLog = lscache.get("updatesLog");
  if (updatesLog !== null) {
    console.log(updatesLog);
    return updatesLog;
  } else {
    await getUpdatesLog().then((result) => {
      const formattedUpdatesLog = formatUpdatesLog(result.data);
      lscache.set("updatesLog", formattedUpdatesLog, 60);
      return formattedUpdatesLog;
    });
  }
};
