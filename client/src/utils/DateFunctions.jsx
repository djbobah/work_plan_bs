export function getToday(){
    const getCurrentDay = new Date();
    const year = getCurrentDay.getFullYear();
    const month = getCurrentDay.getMonth()+1;
    const day = getCurrentDay.getDate();  
    return `${year}-${month}-${day}`
    // console.log(month)
     //return day
}

export function getTommorow(){
    const getCurrentDay = new Date();
    const year = getCurrentDay.getFullYear();
    let month = getCurrentDay.getMonth()+1;
        if (month.length===1){
            month='0'+month
        }
    const day = getCurrentDay.getDate()+1;  
     return `${year}-${month}-${day}`
    //  console.log(month)
    // return "month"
}