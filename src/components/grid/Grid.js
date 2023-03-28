import React from "react";
import { SiFirefoxbrowser } from "react-icons/si";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
const Grid = () => {
  return (
    <section className="containery">
      <h2 style={{ color: "black" }}>ON THE WEB</h2>
      <br></br>
      <div class="row">
        <div class="col" style={{ color: "black" }}>
          <FaLinkedin size={15} />
          LinkedIn
          <input
            type="text"
            class="form-control mainLoginInput"
            placeholder="LinkedIn"
            aria-label="LinkedIn"
          ></input>
        </div>
        <div class="col" style={{ color: "black" }}>
          <FaGithub size={15} />
          Github
          <input
            type="text"
            class="form-control"
            placeholder="Github"
            aria-label="Github"
          />
        </div>
      </div>
      <div class="row">
        <div class="col" style={{ color: "black" }}>
          <FaFacebook size={15} />
          Facebook
          <input
            type="text"
            class="form-control"
            placeholder="Facebook"
            aria-label="Facebook"
          />
        </div>
        <div class="col" style={{ color: "black" }}>
          <FaTwitter size={15} />
          Twitter
          <input
            type="text"
            class="form-control"
            placeholder="Twitter"
            aria-label="Twitter"
          />
        </div>
      </div>
      <div class="row">
        <div class="col" style={{ color: "black" }}>
          <FaInstagram size={15} />
          Instagram
          <input
            type="text"
            class="form-control"
            placeholder="Instagram"
            aria-label="Instagram"
          />
        </div>
        <div class="col" style={{ color: "black" }}>
          <SiFirefoxbrowser size={15} />
          Website
          <input
            type="text"
            class="form-control"
            placeholder="Website"
            aria-label="Website"
          />
        </div>
      </div>
    </section>
  );
};

export default Grid;
