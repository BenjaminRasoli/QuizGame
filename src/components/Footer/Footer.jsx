import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <p>© 2024 Benjamin Rasoli. All Rights Reserved.</p>
        <ul className="footerLinks">
          <li>
            <a
              href="https://www.linkedin.com/in/benjamin-rasoli-2948ab300"
              target="_blank"
            >
              Linkedin
            </a>
          </li>
          <li>
            <a href="https://github.com/BenjaminRasoli" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a href="mailto:benjaminrasoli05@gmail.com">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
