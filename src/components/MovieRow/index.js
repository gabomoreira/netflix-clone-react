import React, { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);

  const handleLeft = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x >= 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRight = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 180;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow-left" onClick={handleLeft}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow-right" onClick={handleRight}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow-listarea">
        <div
          className="movieRow-list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 180,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => {
              const { poster_path, original_title } = item;
              return (
                <div key={key} className="movieRow-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                    alt={original_title}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
