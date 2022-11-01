import React from "react";

const NavCheckButton = (props) => {
  //console.log(props.id);
  //console.log(props.title);
  return (
    <>
      {props.check ? (
        <div
          className="  border rounded flex"
          onClick={() => props.onCheck(props.id)}
          role="button"
        >
          <div className="text-green-500">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* <path stroke="none" d="M0 0h24v24H0z"/> */}

            {/* <polyline points="9 11 12 14 20 6" />

              <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
            </svg> */}
          </div>
          <div className="text-center m-1 p-1">{props.title}</div>
        </div>
      ) : (
        <div
          className=" border rounded  flex text-center"
          onClick={() => props.onCheck(props.id)}
          role="button"
        >
          <div className=" ">{props.title}</div>
        </div>
      )}
    </>
  );
};

export default NavCheckButton;
