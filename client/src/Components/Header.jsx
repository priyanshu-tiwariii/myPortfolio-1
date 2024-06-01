"use client";

import React from "react";
import { useState } from "react";
import { IoIosMoon } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Projects",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
];
export function Header() {
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span></span>
          <span className="font-bold font-serif text-2xl">PT</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-lg font-semibold text-gray-800  hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className=" hidden lg:block items-center space-x-2">
          <button onClick={toggleTheme} className="focus:outline-none">
            {theme === "light" ? (
              <IoIosMoon size={24} />
            ) : (
              <IoIosSunny size={24} />
            )}
          </button>
        </div>

        <div className="lg:hidden flex gap-6 justify-around">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="focus:outline-none"
          >
            {theme === "light" ? (
              <IoIosMoon size={24} />
            ) : (
              <IoIosSunny size={24} />
            )}
          </button>
          <div className="lg:hidden">
            <IoMdMenu
              onClick={setIsOpen}
              className="text-2xl text-gray-800 h-6 w-6 cursor-pointer"
            />
          </div>
        </div>
        {isOpen ? (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg mx-1">
              <div className="flex justify-end">
                <IoMdClose
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray-800 cursor-pointer"
                />
              </div>
              <ul className="mt-4 space-y-6 text-center">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-xl font-semibold text-gray-800 hover:text-gray-900"
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
