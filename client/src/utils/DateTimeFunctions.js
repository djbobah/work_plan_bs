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

export function convertDate(dateString) {
  const date = dateString.split("-");
  // console.log(date[2], ".", date[1], ".", date[0]);
  return `${date[2]}.${date[1]}.${date[0]}`;
}

export const getCurrentTime = () => {
  const currentDay = new Date();
  let currentHour = currentDay.getHours();
  let currentMinute = currentDay.getMinutes();
  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  }
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }
  return currentHour + "" + currentMinute;
};
export const getCurrentDay = () => {
  const currentDay = new Date();
  return currentDay.getDay();
};