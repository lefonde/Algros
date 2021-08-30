import React, {useEffect} from "react";

import Button from "../../shared/components/FormElements/Button";
import HomeImage from "./home.svg";
import Back1 from "../components/background1.svg";

import "./Home.css";


const Home = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Back1})`
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.margin = "0";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.justifyContent = 'space-around'
  }, []);


  return (
      <li className="home__info">
        <div>
          <h1>Hey you!</h1>
          <h2>Lets get ready for your next career upgrade!</h2>
          <Button>Create account</Button>
        </div>
        <div>
          <img src={HomeImage} alt="Home Image" />
        </div>
        <div></div>
      </li>
  );
};

export default Home;
