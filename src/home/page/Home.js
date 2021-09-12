import React, { useEffect } from "react";

import Button from "../../shared/components/FormElements/Button";
import Background_SVG from "../components/background1.svg";
import Computer_SVG from "../components/computer.svg";
import Owl_SVG from "../components/owl.svg";
import Friends from "../components/with_friends.png";

import "./Home.css";

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${Background_SVG})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }, []);

  return (
    <div className="home-test">
      <li className="home__info">
        <div className="welcome-text">
          <h1>Hey you!</h1>
          <h2>Lets get ready</h2>
          <h2>for your next career upgrade!</h2>
          <Button className="create-account" to="/auth">Create account</Button>
        </div>
        <div className="owl-icon">
          <img src={Owl_SVG} alt="Iconic owl" width="170%" height="170%" />
        </div>
        <div className="home-computer">
          <img src={Computer_SVG} alt="Computer" width="170%" height="170%" />
        </div>
        <div className="goodbye-text">
          <h2>Made by: Alex Lefonde and Mor Shaul</h2>
        </div>
        <div className="with-friends-text">
          <h2>With a little help from our friends..</h2>
        </div>
        <div className="friends">
          <img src={Friends} alt="With friends" width="200%" height="200%" />
        </div>
        <div className="home-anchor" id= "homeAnchorTag"/>
        <div className="intro-anchor" id= "introAnchorTag"/>
        <div className="about-anchor" id= "aboutAnchorTag"/>
      </li>
    </div>
  );
};

export default Home;
