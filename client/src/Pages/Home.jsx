import React from "react";
import { useSelector } from "react-redux";
import Image2 from "../assets/12.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

function Home() {
  const { currentTheme } = useSelector((state) => state.theme);
  const [text] = useTypewriter({
    words: ["Full Stack Developer", "MERN Developer", "Football Player"],
    loop: {},
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full dark:text-neutral-200 bg-gray-50 mb-10 dark:bg-neutral-900">
        <div className="mx-auto lg:max-w-6xl md:max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-2 px-4 lg:px-8">
          <div className="flex flex-col justify-center lg:col-span-7 space-y-6">
            <div className="mt-8 p-1 flex max-w-max items-center space-x-2 rounded-full mx-auto lg:mx-0 bg-gray-100 dark:bg-zinc-950">
              <div className="rounded-full  bg-white dark:bg-neutral-900 p-1 px-2">
                <p className="text-sm font-medium">Hire Me</p>
              </div>
              <a
                href="/contact"
                className="text-sm font-medium hover:text-blue-600"
              >
                Contact Me &rarr;
              </a>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-center lg:text-left dark:text-neutral-200 text-black md:text-4xl lg:text-6xl">
              Namaste, I&apos;m Priyanshu Tiwari
            </h1>
            <h1 className="text-lg text-gray-700 text-center lg:text-left dark:text-neutral-200">
              I'm a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold">
                {text}
                <Cursor />
              </span>
            </h1>
            <p className="text-gray-600 text-center   md:px-4 lg:px-0 lg:text-left dark:text-neutral-400">
              Passionate about building dynamic and responsive web applications.
              Experienced in creating end-to-end solutions using the MERN stack.
              Let's connect and create something amazing together!
            </p>
            <div className="flex items-center mx-auto py-3 lg:mx-0 space-x-4">
              <button
                type="button"
                className="rounded-md bg-sky-800 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => window.open("path/to/resume.pdf", "_blank")}
              >
                Download Resume
              </button>
              <Link 
                to={"/works"}
              >
              <button
                type="button"
                className="rounded-md dark:bg-gray-200 bg-black px-10 py-2.5 text-sm font-semibold text-white dark:text-sky-800 shadow-sm dark:hover:bg-neutral-300 hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
               
              >
                Projects
              </button>
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:flex justify-center items-center lg:col-span-5">
            <div>
              <img
                className="h-full w-full p-4 rounded-full object-cover"
                src={Image2}
                alt="Priyanshu Image"
              />
            </div>

            <div className="flex flex-col gap-4  justify-center text-center mx-auto space-x-4">
              <a
                href="https://linkedin.com"
                className="text-gray-700 mx-4  dark:text-gray-200 hover:text-blue-600"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com"
                className="text-gray-700 00 mx-auto dark:text-gray-200 hover:text-black"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-700 00 mx-auto dark:text-gray-200 hover:text-blue-400"
              >
                <BsTwitterX size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-700 00 mx-auto dark:text-gray-200 hover:text-pink-600"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
