import React from "react";
import "./App.css";
import refresh from "./image/icon-refresh.svg";
import sun from "./image/icon-sun.svg";
import down from "./image/icon-arrow-down.svg";

function App() {
  return (
    <div className="APP">
      <div className="container1">
        <h1>
          “The science of operations, as derived from mathematics more
          especially, is a science of itself, and has its own abstract truth and
          value.” <br></br> Ada Lovelace
        </h1>
        <img className="refresh" src={refresh} />
      </div>
      <div className="container2">
        <div className="morningdiv">
          <img className="sun" src={sun} />
          <h2>
            GOOD MORNING <span className="currently">IT’S CURRENTLY</span>
          </h2>
        </div>
        <div className="timediv">
          <p className="time">11:37</p>
          <p className="bst">BST</p>
        </div>
        <div className="infodiv">
          <h3>IN LONDON, UK</h3>
          <div className="morediv">
            <p className="more">MORE</p>
            <div className="pathdiv">
              <img className="down" src={down} />
            </div>
          </div>
        </div>
      </div>
      <div className="container3">
        <div className="firstdiv">
          <div className="timezonediv">
            <p className="times">CURRENT TIMEZONE</p>
            <p className="numbers">Europe/London</p>
          </div>
          <div className="dayyeardiv">
            <p className="times">Day of the year</p>
            <p className="numbers">295</p>
          </div>
        </div>
        <hr className="hr"></hr>
        <div className="seconddiv">
          <div className="dayweekdiv">
            <p className="times">Day of the week</p>
            <p className="numbers">5</p>
          </div>
          <div className="numberdiv">
            <p className="times">Week number</p>
            <p className="numbers">42</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
