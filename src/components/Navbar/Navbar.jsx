import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Navbar.css";
import { useHighScoreStore, useStatsStore } from "../../Store/Store";

function Navbar() {
  const { stats } = useStatsStore();
  const { highScore } = useHighScoreStore();

  return (
    <ul className="navbar">
      <li>HighScore: {highScore}</li>
      <li>CurrentScore: {stats}</li>
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
