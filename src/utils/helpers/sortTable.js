function compareBy(key, isAscending) {
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

function sortTable(columnNumber, isAscending, rows) {
  rows.sort(compareBy(columnNumber, isAscending));
  return rows;
}

export default sortTable;
