import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="mt-2">Feel free to reach out for collaborations or just a friendly chat.</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/iampriyanshu29" aria-label="LinkedIn" className="text-gray-400 hover:text-sky-800 hover:bg-white rounded transition-colors duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/impriyanshu29" aria-label="GitHub" className="text-gray-400 hover:text-black hover:bg-white rounded-full -p-3 transition-colors duration-300">
              <FaGithub size={24} />
            </a>
            <a href="https://x.com/iampriyanshu29" aria-label="Twitter" className="text-gray-400 hover:text-black transition-colors duration-300  ">
              <BsTwitterX size={22} />
            </a>
            <a href="https://www.instagram.com/iampriyanshu29/?hl=en" aria-label="Twitter" className="text-gray-400  hover:text-red-600 transition-colors duration-300">
              <FaInstagram size={22} />
            </a>
            <a href="mailto:youremail@example.com" aria-label="Email" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Priyanshu Tiwari. All rights reserved.</p>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</Link>
            </li>
            <li>
              <Link to="/projects" className="text-gray-400 hover:text-white transition-colors duration-300">Projects</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
