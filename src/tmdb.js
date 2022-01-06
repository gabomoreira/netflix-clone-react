const API_KEY = "660fb904879ed3f2b7677bd90a7f38b4";
const API_BASE = "https://api.themoviedb.org/3";

/*
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- ação
- comédia
- terror 
- romance
- documentários
*/

const basicFetch = async (endpoint) => {
  const response = await fetch(`${API_BASE}${endpoint}`);
  const json = await response.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais do Netflix",
        items: await basicFetch(
          `/discover/tv?with_network=213?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Recomendados para Você",
        items: await basicFetch(
          `/trending/all/week?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "toprated",
        title: "Em Alta",
        items: await basicFetch(
          `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(
          `/discover/movie?language=pt-BR&api_key=${API_KEY}&with_genres=28`
        ),
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFetch(
          `/discover/movie?language=pt-BR&api_key=${API_KEY}&with_genres=35`
        ),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(
          `/discover/movie?language=pt-BR&api_key=${API_KEY}&with_genres=27`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?language=pt-BR&api_key=${API_KEY}&with_genres=10749`
        ),
      },
      {
        slug: "documentary",
        title: "Documentários",
        items: await basicFetch(
          `/discover/movie?languagept-BR&api_key=${API_KEY}&with_genres=99`
        ),
      },
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(
            `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;
        case "tv":
          info = await basicFetch(
            `/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;
        default:
          info = null;
          break;
      }
    }

    return info;
  },
};
