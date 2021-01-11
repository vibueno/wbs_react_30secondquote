//https://medium.com/anna-coding/the-way-to-check-if-its-the-first-time-for-useeffect-function-is-being-run-in-react-hooks-170520554067

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState();
  const firstQuote = useRef(true);

  const getQuote = () => {
    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
      .then((response) => response.json())
      .then((data) => setQuote(data));
  };

  useEffect(() => {
    if (firstQuote.current) {
      getQuote("https://hn.algolia.com/api/v1/search?query=React");
      firstQuote.current = false;
    }

    const interval = setInterval(() => {
      getQuote("https://hn.algolia.com/api/v1/search?query=React");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>
        <a href="/instructions.html"> instructions </a>
      </h1>
      <img
        src="https://media.giphy.com/media/tSVnUxoWoHC/giphy.gif"
        alt="ron"
      />
      <p>{quote}</p>
    </div>
  );
}

export default App;
