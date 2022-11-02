export function getToday() {
  const getCurrentDay = new Date();
  const year = getCurrentDay.getFullYear();
  let month = getCurrentDay.getMonth() + 1;
  let day = getCurrentDay.getDate();
  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
    // console.log("if ", typeof day);
  }
  //   console.log("day ", day);
  //   console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;

  //return day
}

export function getTommorow(currentDay) {
  //const getCurrentDay = new Date();

  if (currentDay === undefined) {
    currentDay = new Date();
  } else {
    currentDay = new Date(currentDay);
  }

  //   console.log(currentDay);

  const year = currentDay.getFullYear();
  let month = currentDay.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = currentDay.getDate() + 1;
  if (day < 10) {
    day = "0" + day;
  }
  //   console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
  //  console.log(month)
  // return "month"
}
