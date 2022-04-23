import React, { useEffect, useRef } from "react";
import ArnoldClarklogo from "./AClogo";
import EdinAirportLogo from "./EAlogo";
import gsap from "gsap";

const Header = ({ interval, toggle, isLoaded }) => {
  const animationWrapper = useRef(null);
  const animationLenght = interval / 1000;

  useEffect(() => {
    if (isLoaded) {
      let x = animationWrapper.current.clientWidth - 140;
      let initialState = {
        x: toggle ? 0 : x,
        scaleX: toggle ? 1 : -1
      };
      let endState = {
        x: toggle ? x : 0
      };
      gsap.fromTo(".shuttleBus", initialState, {
        duration: animationLenght,
        ...endState
      });
    }
  });

  return (
    <header
      style={{
        position: "relative"
      }}
    >
      <EdinAirportLogo style={{ width: "15%", alignSelf: "center" }} />
      <h1
        style={{
          position: "absolute",
          width: "100%"
        }}
      >
        Departures
      </h1>
      <div
        style={{
          flexGrow: 1,
          width: "70%",
          height: "100%",
          position: "relative"
        }}
        ref={animationWrapper}
      >
        {isLoaded && (
          <img
            src="../ACbus.png"
            alt="Arnold Clark Shuttle Bus"
            width="140px"
            height="70px"
            className="shuttleBus"
          />
        )}
      </div>
      <ArnoldClarklogo style={{ width: "15%", alignSelf: "center" }} />
    </header>
  );
};

export default Header;
