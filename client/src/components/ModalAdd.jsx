const ModalAdd = (props) => {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black opacity-40">
      <div className="relative w-auto my-6 mx-auto max-w-3xl z-49">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">General Info</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              // onClick={() => setShowModal(false)}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
              <label className="block text-black text-sm font-bold mb-1">
                First Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
              <label className="block text-black text-sm font-bold mb-1">
                Last Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
              <label className="block text-black text-sm font-bold mb-1">
                Address
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
              <label className="block text-black text-sm font-bold mb-1">
                City
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
            </form>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              // onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              // onClick={() => setShowModal(false)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div
    //   className="fixed top-0 left-0  w-full h-full  overflow-auto bg-black flex "
    //   // className={`modal fade fixed hidden  ${
    //   //   props.showModalAdd ? "" : "show"
    //   // } w-full h-full outline-none overflow-x-hidden overflow-y-auto `}
    // >
    //   {/* <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true"> */}
    //   {/* <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto show" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: block;" aria-modal="true" role="dialog"></div> */}

    //   <div className="items-center flex w-auto h-auto pointer-events-none ">
    //     <div className="modal-content justify-center border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white opacity-100 bg-clip-padding rounded-md outline-none text-current">
    //       <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
    //         <h5
    //           className="text-xl font-medium leading-normal text-gray-800"
    //           id="exampleModalScrollableLabel"
    //         >
    //           Modal title
    //         </h5>
    //         <button
    //           type="button"
    //           className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div className="modal-body relative p-4">
    //         <p>This is a vertically centered modal.</p>
    //       </div>
    //       <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
    //         <button
    //           type="button"
    //           className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
    //           data-bs-dismiss="modal"
    //         >
    //           Close
    //         </button>
    //         <button
    //           type="button"
    //           className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
    //         >
    //           Save changes
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div
    //   className={`modal fade fixed top-0 left-0 bg-black opacity-70 ${
    //     props.showModalAdd ? "" : "hidden"
    //   } w-full h-full outline-none overflow-x-hidden overflow-y-auto`}
    //   id="exampleModalCenter"
    //   tabindex="-1"
    //   aria-labelledby="exampleModalCenterTitle"
    //   aria-modal="true"
    //   role="dialog"
    // >
    //   <div className="bg-white modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    //     <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white  rounded-md outline-none text-current">
    //       {/*  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
    //         <h5
    //           className="text-xl font-medium leading-normal text-gray-800"
    //           id="exampleModalScrollableLabel"
    //         >
    //           Modal title
    //         </h5>
    //         <button
    //           type="button"
    //           className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div className="modal-body relative p-4">
    //         <p>This is a vertically centered modal.</p>
    //       </div>
    //       <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
    //         <button
    //           type="button"
    //           className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
    //           data-bs-dismiss="modal"
    //         >
    //           Close
    //         </button>
    //         <button
    //           type="button"
    //           className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
    //         >
    //           Save changes
    //         </button>
    //       </div> */}
    //       xzczcxz{" "}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ModalAdd;
