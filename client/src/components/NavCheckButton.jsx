import React from "react";

const NavCheckButton = (props) => {
  //console.log(props.id);
  //console.log(props.title);
  return (
    <>
      {props.check ? (
        <div
          className=" text-blue-700 bg-lime-100 text-xs w-42 border-2 border-green-500 cursor-pointer rounded h-8 p-1 mr-3 flex items-center transition ease-in-out hover:text-blue-700  hover:-translate-y+1 hover:scale-105  duration-300"
          onClick={() => props.onCheck(props.id)}
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
          className=" text-white text-xs w-42 border-2 cursor-pointer rounded h-8 p-1 mr-3 flex items-center transition ease-in-out hover:-translate-y+1 hover:scale-105  duration-300"
          onClick={() => props.onCheck(props.id)}
        >
          <div className="text-center m-1 p-1 ">{props.title}</div>
        </div>
      )}
    </>
  );
};

export default NavCheckButton;
