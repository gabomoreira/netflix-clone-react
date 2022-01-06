import React from "react";
import "./FeaturedMovie.css";

const FeaturedMovie = ({ featuredMovie }) => {
  let year = new Date(featuredMovie.first_air_date);
  let genres = [];
  for (let i in featuredMovie.genres) {
    genres.push(featuredMovie.genres[i].name);
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `${
          featuredMovie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})`
            : "url(https://bringit.com.br/blog/wp-content/uploads/2016/11/banner_404.jpg)"
        }`,
      }}
    >
      <div className="featured-vertical">
        <div className="featured-horizontal">
          <div className="featured-name">{featuredMovie.name} </div>
          <div className="width">
            <div className="featured-info">
              <div className="featured-points">
                {featuredMovie.vote_average} pontos
              </div>
              <div className="featured-year">{year.getFullYear()}</div>
              <div className="featured-seasons">
                {featuredMovie.number_of_seasons > 1
                  ? `${featuredMovie.number_of_seasons} Temporadas`
                  : `${featuredMovie.number_of_seasons} Temporada`}
              </div>
            </div>
            <div className="featured-description">
              {`${featuredMovie.overview.substring(0, 120)}...`}
            </div>
            <div className="featured-btns">
              <a
                href={`/watch/${featuredMovie.id}`}
                className="featured-watchBtn"
              >
                ▶ Assistir
              </a>
              <a
                href={`/list/add/${featuredMovie.id}`}
                className="featured-myListBtn"
              >
                + Minha Lista
              </a>
            </div>
            <div className="featured-genres">
              <strong>
                Gênero{`${featuredMovie.genres.length === 1 ? ": " : "s: "}`}
              </strong>
              {featuredMovie.genres[0] ? genres.join(", ") : "..."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
