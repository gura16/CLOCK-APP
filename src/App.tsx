import "./App.css";
import React, { useState, useEffect } from "react";
import refresh from "./image/icon-refresh.svg";
import sun from "./image/icon-sun.svg";
import moon from "./image/icon-moon.svg";
import down from "./image/icon-arrow-down.svg";

function getWeekNumber(date: Date): number {
  const onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
  );
}

function App() {
  const defaultQuote =
    "“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”";

  const [localTime, setLocalTime] = useState(new Date());
  const [text, setText] = useState(defaultQuote);
  const [author, setAuthor] = useState("Ada Lovelace");
  const [button, setButton] = useState(true);
  const [morningOrNight, setMorningOrNight] = useState(true);

  const buttonClick = () => {
    if (button) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    const currentHour = localTime.getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setMorningOrNight(true);
      document.body.className = "";
    } else {
      setMorningOrNight(false);
      document.body.className = "night";
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [localTime]);

  const formattedLocalTime = localTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getTimeZoneParts = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [area, location] = timeZone.split("/");
    return { area, location };
  };

  const getCurrentDayOfYear = (): number => {
    const startOfYear = new Date(localTime.getFullYear(), 0, 1);
    const diff =
      (localTime.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000);
    return Math.floor(diff) + 1;
  };

  const getCurrentDayOfWeek = (): number => {
    return localTime.getDay();
  };

  const getCurrentWeek = (): number => {
    return getWeekNumber(localTime);
  };

  async function getRandomQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      return data;
    } catch (error) {}
  }

  const fetchRandomQuote = async () => {
    const randomQuote = await getRandomQuote();
    setText(randomQuote.content);
    setAuthor(randomQuote.author);
  };

  const refreshtext = () => {
    fetchRandomQuote();
  };

  return (
    <div className="APP">
      <div
        style={button ? { display: "" } : { display: "none" }}
        className="container1"
      >
        <h1>
          {text} <br></br> {author}
        </h1>
        <img onClick={refreshtext} className="refresh" src={refresh} />
      </div>
      <div className="container2">
        <div className="morningdiv">
          <img className="sun" src={morningOrNight ? sun : moon} />
          <h2>
            GOOD {morningOrNight ? "MORNING" : "EVENING"},{" "}
            <span className="currently">IT’S CURRENTLY</span>
          </h2>
        </div>
        <div className="timediv">
          <p className="time">{formattedLocalTime}</p>
          <p className="bst">BST</p>
        </div>
        <div className="infodiv">
          <h3>
            {getTimeZoneParts().area}, {getTimeZoneParts().location}
          </h3>
          <div className="morediv">
            <p className="more">{button ? "MORE" : "LESS"}</p>
            <div onClick={buttonClick} className="pathdiv">
              <img
                style={
                  button
                    ? { rotate: "", transition: "1.5s" }
                    : { rotate: "180deg", transition: "1.5s" }
                }
                className="down"
                src={down}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={button ? { display: "none" } : { display: "" }}
        className={morningOrNight ? "container3" : "container3 night2"}
      >
        <div className="firstdiv">
          <div className="timezonediv">
            <p
              className="times"
              style={morningOrNight ? { color: "" } : { color: "white" }}
            >
              CURRENT TIMEZONE
            </p>
            <p
              className="numbers"
              style={morningOrNight ? { color: "" } : { color: "white" }}
            >
              {getTimeZoneParts().area}/{getTimeZoneParts().location}
            </p>
          </div>
          <div className="dayyeardiv">
            <p
              className="times"
              style={morningOrNight ? { color: "" } : { color: "white" }}
            >
              Day of the year
            </p>
            <p
              className="numbers"
              style={morningOrNight ? { color: "" } : { color: "white" }}
            >
              {getCurrentDayOfYear()}
            </p>
          </div>
        </div>
        <hr className="hr"></hr>
        <div className="seconddiv">
          <div className="dayweekdiv">
            <p
              className="times"
              style={morningOrNight ? { color: "" } : { color: "white" }}
            >
              Day of the week
            </p>
            <p
              className="numbers"
              style={morningOrNight ? { color: "" } : { color: "white" }}
            >
              {getCurrentDayOfWeek()}
            </p>
          </div>
          <div className="numberdiv">
            <p
              className="times"
              style={morningOrNight ? { color: "" } : { color: "white" }}
            >
              Week number
            </p>
            <p
              className="numbers"
              style={morningOrNight ? { color: "" } : { color: "white" }}
            >
              {getCurrentWeek()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
