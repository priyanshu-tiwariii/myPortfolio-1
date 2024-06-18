"use client";

import React from "react";
import { useState } from "react";
import { IoIosMoon } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { changeTheme } from "../Redux/function/theme.slice";
import { useSelector, useDispatch } from "react-redux";
const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Resume",
    href: "/resume",
  },
  {
    name: "Works",
    href: "/works",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
export function Header() {
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const {currentTheme} = useSelector((state)=>state.theme);
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=>state.user);

  const handleTheme = () =>{
    console.log('Theme:', currentTheme);
  dispatch(changeTheme())
  }
  return (
    <div className="relative w-full bg-gradient-to-r from-green-50 via-gray-50 to-green-100 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900 dark:text-neutral-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
        <span className="font-bold font-serif text-2xl">
        {currentUser && currentUser?.data?.loggedInUser?.isAdmin
                ? <Link to="/admin2213008"  className={`whitespace-nowrap self-center font-logo_font text-black/80 dark:text-green-50 text-sm sm:text-xl font-semibold`}>
                    PT
                  </Link>
                
                :
                <Link to="/" className={`whitespace-nowrap self-center font-logo_font text-black/80 dark:text-green-50 text-sm sm:text-xl font-semibold`}>
                  PT
                </Link>
                }
        </span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                 to = {item.href}
                  className="text-lg font-semibold dark:text-green-50 text-black/80 dark:hover:text-green-300/80   hover:text-green-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className=" hidden lg:block items-center space-x-2">
          
        <button
              className=" m-2   dark:text-gray-200 hover:text-gray-700  sm:inline"
              color="#F5F5F"
              onClick={handleTheme}
            >
              {currentTheme === "dark" ? <IoIosSunny /> : <IoIosMoon />}
            </button>
        </div>

        <div className="lg:hidden flex gap-6 justify-around">
        <button
              className=" h-6 w-6    dark:text-gray-200 hover:text-gray-700  sm:inline"
              color="#F5F5F"
              onClick={handleTheme}
            >
              {currentTheme === "dark" ? <IoIosSunny /> : <IoIosMoon />}
            </button>
          <div className="lg:hidden my-auto">
            <IoMdMenu
              onClick={setIsOpen}
              className="text-2xl dark:text-gray-200 text-gray-800 h-6 w-6 cursor-pointer"
            />
          </div>
        </div>
        {isOpen ? (
          <div className="fixed inset-0 z-20 flex items-center justify-center  bg-opacity-75 transition-opacity duration-300">
            <div className="relative w-full max-w-md p-6  bg-gray-50 dark:dark:bg-neutral-950 rounded-lg shadow-lg mx-1">
              <div className="flex justify-center">
                <IoMdClose
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-red-800 dark:text-red-600  dark:hover:text-gray-50  hover:text-gray-900 cursor-pointer"
                />
              </div>
              <ul className="mt-4 space-y-6 text-center">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-xl font-semibold dark:text-green-50 text-black/80  dark:hover:text-green-400/40 hover:font-bold  hover:text-green-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
