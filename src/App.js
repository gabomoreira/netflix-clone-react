import React, { useEffect, useState } from "react";
import "./App.css";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import MovieRow from "./components/MovieRow";
import tmdb from "./tmdb";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      const list = await tmdb.getHomeList();
      setMovieList(list);

      const originals = list.filter((item) => item.slug === "originals");
      const randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      const chose = originals[0].items.results[randomChosen];
      const chosenInfo = await tmdb.getMovieInfo(chose.id, "tv");

      setFeaturedMovie(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredMovie && <FeaturedMovie featuredMovie={featuredMovie} />}

      <section className="lists">
        {movieList.map((item, key) => {
          return <MovieRow key={key} title={item.title} items={item.items} />;
        })}
      </section>

      <footer>
        <p>Criado por Gabriel Moreira</p>
        <p>Direitos de imagem para Netflix</p>
        <p>Dados pegos do site Themoviedb.org</p>
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
};

export default App;
