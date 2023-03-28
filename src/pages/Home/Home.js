import React from "react";

import { Link } from "react-router-dom";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogout } from "../../components/protect/HiddenLink";
import { ShowOnLogin } from "../../components/protect/HiddenLink";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.scss";
const Home = () => {
  return (
    <Sidebar>
      <div className="home">
        <nav className="container --flex-between">
          <div className="logo">
            <img className="imaging" src="favicon.ico" alt="logo" />
            <h5 className="logoH">CipherSchools</h5>
          </div>
          <ul className="home-links">
            <ShowOnLogout>
              <li>
                {/* <button className="--btn --btn-primary"> */}
                <Link to="/register" className="texty3">
                  Register
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* </button> */}
              </li>
            </ShowOnLogout>
            <ShowOnLogout>
              <li>
                {/* <button className="--btn --btn-primary"> */}
                <Link to="/login" className="texty3">
                  Login
                </Link>
                {/* </button> */}
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <Link to="/dashboard" className="texty4">
                  Profile
                </Link>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>

        <section className="container hero">
          <div className="hero-text">
            <span className="texty">
              Welcome to the <span className="texty2">Future </span>
              of Learning
            </span>
            <p>
              Cipherschools is a bootstrapped educational video streaming
              platform in India that is connecting passionate unskilled students
              to skilled Industry experts to fulfill their career dreams.
            </p>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Inventory" />
          </div>
        </section>
      </div>
    </Sidebar>
  );
};

export default Home;
