import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

export function Admin() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const pathName = location.pathname;
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    setPathName(pathName);
  }, [location.search]);

  const getLinkClass = (tabName) => {
    return `flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 ${
      tab === tabName
        ? "dark:text-black dark:bg-green-100 bg-black/80 text-green-100"
        : "dark:text-gray-400 text-gray-700 dark:hover:text-black dark:hover:bg-green-100 hover:text-green-100 hover:bg-black/80"
    }`;
  };

  return (
    <>
      {currentUser && currentUser?.data?.loggedInUser?.isAdmin ? (
        <aside className="flex h-screen w-64 shadow-xl rounded-md  flex-col overflow-y-auto border bg-gradient-to-r from-green-50 via-gray-50 to-green-100  dark:bg-gradient-to-r dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950 px-5 mx-2 my-2 py-8 z-20">
          <Link to="/">
            <span className="text-xl font-bold font-serif black/80 dark:text-green-100">
              Welcome Admin !!
            </span>
          </Link>

          <div className="mt-6 flex flex-1 flex-col justify-between">
            <nav className="-mx-3 space-y-6 ">
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-bold uppercase text-black/80 dark:text-green-100">
                  home
                </label>
                <NavLink
                  to="/admin2213008?tab=hero-section"
                  className={getLinkClass("hero-section")}
                >
                  <span className="mx-2 text-sm font-medium">Hero Section</span>
                </NavLink>
                <NavLink
                  to="/admin2213008?tab=about-section"
                  className={getLinkClass("about-section")}
                >
                  <span className="mx-2 text-sm font-medium">
                    About Section
                  </span>
                </NavLink>
                <NavLink
                  className={getLinkClass("messages")}
                  to="/admin2213008?tab=messages"
                >
                  <span className="mx-2 text-sm font-medium">
                    Messages
                  </span>
                </NavLink>
              </div>
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-bold uppercase text-black/80 dark:text-green-100">
                  Resume
                </label>
                <NavLink
                  className={getLinkClass("intro")}
                  to="/admin2213008?tab=intro"
                >
                  <span className="mx-2 text-sm font-medium">Introduction</span>
                </NavLink>
                <NavLink
                  to="/admin2213008?tab=skills"
                  className={getLinkClass("skills")}
                >
                  <span className="mx-2 text-sm font-medium">
                    Skills & Tools
                  </span>
                </NavLink>
                <NavLink
                  to="/admin2213008?tab=social"
                  className={getLinkClass("social")}
                >
                  <span className="mx-2 text-sm font-medium">
                    Social Media
                  </span>
                </NavLink>
                <NavLink
                  className={getLinkClass("experience")}
                  to="/admin2213008?tab=experience"
                >
                  <span className="mx-2 text-sm font-medium">Experience</span>
                </NavLink>
                <NavLink
                  className={getLinkClass("education")}
                  to="/admin2213008?tab=education"
                >
                  <span className="mx-2 text-sm font-medium">Education</span>
                </NavLink>
                <NavLink
                  className={getLinkClass("projects")}
                  to="/admin2213008?tab=projects"
                >
                  <span className="mx-2 text-sm font-medium">Project</span>
                </NavLink>
              </div>
            </nav>
            <div className="mt-6">
              <div className="mt-6 flex items-center justify-between">
                <NavLink to="/resume" className="flex items-center gap-x-2">
                  <h1 className="text-base font-bold dark:text-gray-400 text-gray-700 dark:hover:text-black dark:hover:bg-green-100 hover:text-green-100 hover:bg-black/80">
                    Admin!!
                  </h1>
                  <span className="text-sm  dark:text-gray-400 text-gray-700 dark:hover:text-black dark:hover:bg-green-100 hover:text-green-100 hover:bg-black/80">
                    {currentUser?.data?.loggedInUser?.name}
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </aside>
      ) : currentUser ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
          <p className="text-lg text-gray-700 mt-4">
            You are not allowed to access this page.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-8">Welcome to Admin Page</h1>
          <div className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            <Link to="signIn" className="text-lg font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
