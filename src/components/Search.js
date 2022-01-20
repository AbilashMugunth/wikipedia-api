import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Search = () => {
  const [term, setTerm] = useState("javascript");
  const [results, setResults] = useState([]);
  console.log(results);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    const timeoutId = setTimeout(() => {
      search();
    }, 500);

    // *!Cleanup function of useeffect////
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const renderedResults = results.map((e) => {
    return (
      <div key={e.pageid} className="item">
        <div>
          <a
            href={`https://en.wikipedia.org?curid=${e.pageid}`}
            className="ui button right floated content"
            // target="_blank"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{e.title}</div>
          <span dangerouslySetInnerHTML={{ __html: e.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div>{renderedResults}</div>
    </div>
  );
};

export default Search;
