import React from "react";
import TableHeader from "./TableHeader";
import TableRowsPlan from "./tableRowsPlan";
const Table = ({ columns, ...rest }) => {
  //console.log(props.id);
  //console.log(props.title);

  //console.log(columns)
  return (
    <div className="text-white flex  mx-auto  px-1 justify-between items-center ">
      <div className="border-stone-900 border mt-1 p-1 rounded text-black bg-gray-200">
        <table className=" table table-striped border-collapse border-2 border-slate-800 border-rounded bg-gray-200">
          <TableHeader columns={columns} />
          <TableRowsPlan columns={columns} {...rest} />
        </table>
      </div>
    </div>
  );
};
export default Table;
