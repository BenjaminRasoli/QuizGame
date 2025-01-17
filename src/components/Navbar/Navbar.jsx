import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <ul className="navbar">
      <li>Quiz Game</li>
      <ul className="navbarSocialMedia">
        <li>
          <a
            href="https://www.linkedin.com/in/benjamin-rasoli-2948ab300"
            target="_blank"
          >
            <FaLinkedin size={25} className="linkedinIcon" />
          </a>
        </li>
        <li>
          <a href="https://github.com/BenjaminRasoli" target="_blank">
            <FaGithub size={25} className="githubIcon" />
          </a>
        </li>
      </ul>
    </ul>
  );
}

export default Navbar;
