import React from "react";

const TableHeader = ({ columns }) => {
  //    console.log(columns);
  //console.log(props.title);
  return (
    <thead className="bg-sky-700">
      <tr>
        {/* width={column.width>0?`${column.width}px`:'100px'}  */}
        {columns.map((column) => (
          //   column.width>0?<th className="border"  width={`${column.width}px`} key={column.id}>{ column.title}</th>
          //   :
          <th className="border bg-secondary p-1" key={column.id}>
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default TableHeader;
