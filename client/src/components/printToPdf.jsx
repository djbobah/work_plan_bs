import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// import { TableRowsPlan } from "./rowTablesPlan;
import TableRowsPlan from "./tableRowsPlan";

const PrintToPdf = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <TableRowsPlan ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};
export default PrintToPdf;
