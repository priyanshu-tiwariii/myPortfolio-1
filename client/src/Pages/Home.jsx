import React from "react";
import { useSelector } from "react-redux";
import Image2 from "../assets/11.png";
import Image3 from "../assets/13.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoMdPaper } from "react-icons/io";
import { IoDiamondOutline } from "react-icons/io5";
import { LuFileCode2 } from "react-icons/lu";

const items = [
  {
    icon: <LuFileCode2 className="text-green-600 font-bold h-6 w-7" />,
    title: "Proven Expertise",
    description:
      "Specialize in MERN I ensure your project is built with the latest technologies",
  },
  {
    icon: <IoMdPaper className="text-green-600 font-bold h-6 w-7" />,
    title: "Tailored Solutions",
    description:
      "Delivering customized solutions that perfectly fit your vision",
  },
  {
    icon: <IoDiamondOutline className="text-green-600 font-bold h-6 w-7" />,
    title: "Attention to Detail",
    description:
      "Clean, efficient code to a seamless user experience, ensuring the highest quality",
  },
];

function Home() {
  const { currentTheme } = useSelector((state) => state.theme);
  const [text] = useTypewriter({
    words: ["Full Stack Developer", "MERN Developer", "Football Player"],
    loop: {},
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-green-50 via-gray-50 to-green-100 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900 dark:text-neutral-200">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-5 px-4 lg:px-8">
          <div className="flex flex-col  justify-center text-center lg:text-left my-4 py-8 lg:col-span-7 space-y-6">
            <div className="mt-8 p-1 flex mx-auto lg:mx-0 max-w-max items-center space-x-2 rounded-full bg-green-100/40 dark:bg-zinc-950">
              <div className="rounded-full bg-green-200/40 dark:bg-neutral-900 p-1 px-2">
                <p className="text-sm font-medium">Hire Me</p>
              </div>
              <a
                href="/contact"
                className="text-sm font-medium hover:text-blue-600"
              >
                Contact &rarr;
              </a>
            </div>
            <h1 className="text-4xl font-bold tracking-tight dark:text-green-50 text-black/80 md:text-4xl lg:text-6xl">
              Namaste, I&apos;m Priyanshu Tiwari
            </h1>
            <h1 className="text-lg text-gray-700 dark:text-neutral-200">
              I'm a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold">
                {text}
                <Cursor />
              </span>
            </h1>
            <p className="text-gray-600 dark:text-neutral-200">
              Passionate about building dynamic and responsive web applications.
              Experienced in creating end-to-end solutions using the MERN stack.
              Let's connect and create something amazing together!
            </p>
            <div className="flex items-center mx-auto lg:mx-0 space-x-4">
              <button
                type="button"
                className="rounded-md bg-yellow-500/70 dark:bg-yellow-400/80 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => window.open("path/to/resume.pdf", "_blank")}
              >
                Download Resume
              </button>
              <button
                type="button"
                className="rounded-md text-green-100 dark:bg-green-100 dark:text-black px-3 py-2.5 text-sm font-semibold bg-black/80 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => window.open("path/to/resume.pdf", "_blank")}
              >
                View Portfolio
              </button>
            </div>
          </div>
          <div className="hidden lg:flex flex-row gap-2 items-center lg:col-span-5">
            <img
              className="h-full w-full mt-8 object-cover"
              src={Image2}
              alt="Priyanshu Image"
            />
            <div className="flex flex-col gap-4 mt-4">
              <a
                href="https://linkedin.com"
                className="text-black/80 dark:text-green-100 dark:hover:text-blue-600 hover:text-blue-600"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com"
                className="text-black/80 dark:text-green-100 dark:hover:text-gray-200 hover:text-black"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-black/80 dark:text-green-100 dark:hover:text-gray-200 hover:text-black"
              >
                <BsTwitterX size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-black/80 dark:text-green-100 hover:text-pink-600 dark:hover:text-pink-600"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity section */}
      <div className="mx-auto mt-4 pb-6 bg-green-300/40 dark:bg-black/80 py-10 rounded-xl shadow max-w-6xl px-2 lg:px-8 dark:darkBanner">

        <div className="flex flex-wrap bloc justify-around gap-y-8 text-center">
          <div>
            <div className="mx-auto flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-red-100">
              <FaLaptopCode className="text-red-500 h-5 w-5 md:h-7 md:w-7" />
            </div>
            <h3 className="mt-3 text-sm md:text-lg dark:text-green-100 font-semibold text-black">
              +7 Developed Projects
            </h3>
          </div>
          <div>
            <div className="mx-auto flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-yellow-100">
              <FaCode className="text-yellow-500 h-5 w-5 md:h-7 md:w-7" />
            </div>
            <h3 className="mt-3 text-sm md:text-lg font-semibold dark:text-green-100 text-black">
              +13 Coding Languages
            </h3>
          </div>
          <div>
            <div className="mx-auto flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gray-100">
              <SlCalender className="text-gray-500 h-5 w-5 md:h-7 md:w-7" />
            </div>
            <h3 className="mt-3 text-sm md:text-lg font-semibold dark:text-green-100 text-black">
              +1 Year of Experience
            </h3>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative w-full bg-green-50/70 dark:bg-neutral-900 dark:text-neutral-200">
        <h1 className="text-3xl font-bold text-center pt-24 mb-2 dark:text-green-50 bloc text-black/80 md:text-4xl lg:text-6xl">
          About Me
        </h1>
        <div className="mx-auto max-w-6xl  grid grid-cols-1 lg:grid-cols-12 gap-5 px-4 lg:px-8">
          <div className="hidden lg:flex flex-col blo items-center lg:col-span-5">
            <img
              className="h-full w-full mt-8 object-cover"
              src={Image3}
              alt="Priyanshu Image"
            />
          </div>
          <div className="flex flex-col justify-center blo my-4 lg:py-8 lg:col-span-7 space-y-6">
            <div className="md:mt-8 mt-3 p-1 mx-auto lg:mx-0 flex max-w-max items-center space-x-2 rounded-full bg-green-100/40 dark:bg-zinc-950">
              <div className="rounded-full bg-green-200/40 dark:bg-neutral-900 p-1 px-2">
                <p className="md:text-sm text-xs font-medium">Skills</p>
              </div>
              <a
                href="/resume"
                className="md:text-sm text-xs  font-medium hover:text-blue-600"
              >
                Have a Look &rarr;
              </a>
            </div>
            <h2 className="text-2xl font-bold text-center lg:text-left dark:text-green-50 text-black/80">
              Coding by Day, Goalkeeping by Passion
            </h2>
            <p className="text-gray-600 dark:text-neutral-200 text-center text-sm md:text-base px-2 md:px-6 lg:px-0 lg:text-left">
              Hey there! I'm Priyanshu Tiwari, a web developer who loves turning
              ideas into interactive, beautiful websites using MERN. When I'm
              not coding, you'll find me on the football field, diving and
              defending as a passionate goalkeeper. Whether it's crafting a
              seamless user experience or making a game-winning save, I bring my
              all to everything I do.
            </p>
            <div className="flex items-center space-x-4 justify-center lg:justify-start">
              <button
                type="button"
                className="rounded-md bg-yellow-500/70 dark:bg-yellow-400/80 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => window.open("path/to/resume.pdf", "_blank")}
              >
                Contact Me
              </button>
              <button
                type="button"
                className="rounded-md text-green-100 dark:bg-green-100 dark:text-black px-6 py-2.5 text-sm font-semibold bg-black/80 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => window.open("path/to/resume.pdf", "_blank")}
              >
                My Works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Me */}
      <div className="relative w-full mb-6 text-center lg:text-left bg-green-50/70 dark:bg-neutral-900 dark:text-neutral-200">
        <h1 className="text-4xl font-bold text-center pt-16 lg:pt-20 md:mb-2 dark:text-green-50 bloc text-black/80 md:text-4xl lg:text-6xl">
          Why Me
        </h1>
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-8">
          <div className="flex flex-col justify-center my-4 lg:py-8 lg:col-span-7 space-y-6 blo">
            <div className="md:mt-8 mt-4 p-1 flex max-w-max items-center space-x-2 rounded-full mx-auto lg:mx-0 bg-green-100/40 dark:bg-zinc-950">
              <div className="rounded-full bg-green-200/40 dark:bg-neutral-900 p-1 px-2">
                <p className="md:text-sm text-xs  font-medium">Who</p>
              </div>
              <a
                href="/resume"
                className="text-sm font-medium hover:text-blue-600"
              >
                I am &rarr;
              </a>
            </div>
            <h2 className="text-2xl font-bold text-center lg:text-left dark:text-green-50 text-black/80">
              Why Work with Me on Your Next{" "}
              <span className="text-yellow-500/70 dark:text-yellow-400/80">
                Project?
              </span>
            </h2>
            <p className="text-gray-600 px-2 md:px-6 lg:px-0 dark:text-neutral-200 text-center text-sm md:text-base lg:text-left">
              With a perfect blend of creativity and technical expertise, I
              deliver bespoke solutions tailored to your unique needs. Count on
              clear communication and reliable delivery, ensuring your project
              is in capable hands from start to finish.
            </p>
            <div className="flex mx-auto lg:mx-0 items-center space-x-4">
              <button
                type="button"
                className="rounded-md bg-yellow-500/70 dark:bg-yellow-400/80 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => window.open("path/to/resume.pdf", "_blank")}
              >
                Know Me
              </button>
              <button
                type="button"
                className="rounded-md text-green-100 dark:bg-green-100 dark:text-black px-3 py-2.5 text-sm font-semibold bg-black/80 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => window.open("path/to/resume.pdf", "_blank")}
              >
                Look at My Works
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 pt-5 blo lg:pt-10">
            <div className="flex flex-col gap-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  } `}
                >
                  <div className="flex flex-col items-center lg:items-start mx-auto lg:mx-0 gap-1  w-2/3">
                    {item.icon}
                    <p className="text-lg dark:text-green-200 text-black/80 font-bold">
                      {item.title}
                    </p>
                    <p className="text-sm dark:text-gray-500 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
