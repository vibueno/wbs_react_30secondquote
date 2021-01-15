//https://medium.com/anna-coding/the-way-to-check-if-its-the-first-time-for-useeffect-function-is-being-run-in-react-hooks-170520554067

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState();
  const firstQuote = useRef(true);

  const getQuote = () => {
    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
      .then((response) => response.json())
      .then((data) => setQuote(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (firstQuote.current) {
      getQuote();
      firstQuote.current = false;
    }

    const interval = setInterval(() => {
      getQuote();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>
        {/*process.env.PUBLIC_URL is needed since for some reason webpack is not
        working*/}
        <a href={process.env.PUBLIC_URL + "/instructions.html"}>instructions</a>
      </h1>
      <img
        src="https://media.giphy.com/media/tSVnUxoWoHC/giphy.gif"
        alt="ron"
      />
      <p>(quote)?{quote}:null</p>
    </div>
  );
}

export default App;
