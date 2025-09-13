import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MovieCard from "../movieCard/MovieCard";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieSlider = () => {
  const [activeTab, setActiveTab] = useState("movie"); // default Movies
  const [items, setItems] = useState([]);

  const fetchData = async (type) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/popular?api_key=d22e246210cc9bf2d5cae061692dd20c&language=en-US`
      );
      const result = await response.json();
      console.log(result, `${type} results`);
      setItems(result.results || []);
    } catch (error) {
      console.error(`Failed to fetch ${type} data:`, error);
    }
  };

  useEffect(() => {
    fetchData(activeTab); // fetch when activeTab changes
  }, [activeTab]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="p-5 mt-5 bg-black">
      <div className="container">
        <h2 className="text-white text-2xl mb-4 font-bold">What to watch</h2>

        {/* Bootstrap Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "movie" ? "active" : ""}`}
              onClick={() => setActiveTab("movie")}
            >
              Movies
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tv" ? "active" : ""}`}
              onClick={() => setActiveTab("tv")}
            >
              TV
            </button>
          </li>
        </ul>

        {/* Slider */}
        <Slider {...settings}>
          {items.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              media_type={activeTab} // 👈 Pass tab type to card
              title={activeTab === "movie" ? item.title : item.name}
              genre={item.genre_ids?.[0]} // You can replace with genre mapping if needed
              rating={item.vote_average?.toFixed(1)}
              poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieSlider;
