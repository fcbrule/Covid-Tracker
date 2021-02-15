import axios from "axios";

export function getStatesData() {
  const url = "https://api.covid19india.org/v4/min/data.min.json";
  return axios.get(url).catch((err) => {
    console.log(err);
    return err;
  });
}

export function getUpdatesLog() {
  const url = "https://api.covid19india.org/updatelog/log.json";
  return axios.get(url).catch((err) => {
    console.log(err);
    return err;
  });
}
