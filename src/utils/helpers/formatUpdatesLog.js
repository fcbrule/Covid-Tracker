function getRelativeTime(current, previous) {
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

function isMoreThan24Hours(current, older) {
  return current - older > 24 * 60 * 60 * 1000;
}

function formatUpdatesLog(updatesLog) {
  if (updatesLog.length === 0) return {};
  updatesLog.reverse();
  let updates = {};
  const currentTimestamp = +new Date();
  updatesLog.map((updateObject) => {
    let { timestamp, update } = updateObject;
    const dateObject = new Date(timestamp * 1000);
    // if (isMoreThan24Hours(currentTimestamp, timestamp * 1000)) return updates;
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

export default formatUpdatesLog;
