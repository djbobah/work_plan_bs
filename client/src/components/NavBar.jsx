import React from "react";
import logo from "../static/img/doc2.png";
// import NavCheckButton from "./NavCheckButton";
const NavBar = () => {
  return (
    <nav className="bg-sky-900 sticky top-0">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between font-mono ">
          <div className=" h-10 flex items-center text-gray-300 ml-2 cursor-pointer">
            <img src={logo} className="h-10 " alt="logo" />
            <span className="ml-3  text-xl hover:text-white  text-center">
              ПЛАН
              <br /> РАБОТ
            </span>
          </div>
          <div className="flex items-center text-xl text-gray-200 uppercase underline">
            Линейно-эксплуатационная служба
          </div>

          <div className="ml-5">user</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
