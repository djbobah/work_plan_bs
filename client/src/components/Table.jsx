import React from "react"
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

const Table = (props) => {
    //console.log(props.id);
    //console.log(props.title);
const columns=[{title:"№ п/п",id:1,width:30},
                {title:"Дата",id:2,width:20},
                {title:"Планируемые работы",id:3,width:200},
                {title:"Способ проведения работ",id:4,width:50},
                {title:"Объект",id:5,width:200},
                {title:"Состав бригады / наименование подрядной организации",id:6,width:100},
                {title:"Тип транспорта",id:7,width:0},
                {title:"Марка - Гос.№",id:8,width:0},
                {title:"Комментарий",id:9,width:0},
                {title:"Согласование работ повышенной опасности",id:10,width:100},
                {title:"Отметка о выполнении",id:11,width:0},
                {title:"",id:12,width:0},
            
            ]

const rows=[{title:"№ п/п",id:1,width:30},
                {title:"Дата",id:2,width:20},
                {title:"Планируемые работы",id:3,width:200},
                {title:"Способ проведения работ",id:4,width:50},
                {title:"Объект",id:5,width:200},
                {title:"Состав бригады /наименование подрядной организации",id:6,width:100},
                {title:"Тип транспорта",id:7,width:100},
                {title:"Марка - Гос.№",id:8,width:50},
                {title:"Комментарий",id:9,width:0},
                {title:"Согласование работ повышенной опасности",id:10,width:0},
                {title:"Отметка о выполнении",id:11,width:0},
                {title:"",id:12,width:0},
            
            ]
//console.log(columns)
    return (    
    <div className="text-white flex  mx-auto  px-1 justify-between items-center " >
        <div className="border-stone-900 border mt-1 p-2 rounded text-black bg-gray-200"  >
            <table className="  border-collapse border-2 border-slate-800 border-rounded bg-gray-200">
                 <TableHeader columns={columns}/> 
                <TableRows/>
            </table>
        </div>
    </div>
    )
}
    export default Table;