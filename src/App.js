import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.png";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import wordsToNumbers from "words-to-numbers";
const alanKey = process.env.REACT_APP_API_KEY;
function App() {
  const [newsArticles, setNewsArtilces] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArtilces(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsed =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          if (parsed > 20) {
            alanBtn().playText("Please try a different number");
          } else {
            window.open(articles[parsed - 1].url, "_blank");
          }
        }
      },
    });
  }, []);
  return (
    <div className="App">
      <img src={logo} />
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
