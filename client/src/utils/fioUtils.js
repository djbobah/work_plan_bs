export function shortFio(fio) {
  if (!fio) return "";
  const fioArr = fio.split(" ");
  // console.log(date[2], ".", date[1], ".", date[0]);
  return `${fioArr[0]} ${fioArr[1][0]}. ${fioArr[2][0]}.`;
}
