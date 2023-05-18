import React, { useState } from "react";
import "./Home.css";
import AceEditor from "react-ace";

export default function Home() {
  const quotes = [
    {
      quote:
        "Any sufficiently advanced technology is indistinguishable from magic.",
      author: "Arthur C. Clarke",
    },
    {
      quote: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
    },
    {
      quote: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
    },
  ];

  return (
    <div className="TechnicalQuotes">
      {quotes.map((quote) => (
        <div key={quote.quote}>
          <p>{quote.quote}</p>
          <p>- {quote.author}</p>
        </div>
      ))}
    </div>
  );
}
