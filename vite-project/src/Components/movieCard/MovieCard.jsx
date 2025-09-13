import { FaStar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MovieCard = ({ title, genre, rating, poster, id, media_type }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  // 🔹 Check if this movie/TV is already in favorites (when card loads)
  useEffect(() => {
    const fetchAccountState = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${media_type}/${id}/account_states`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2Q0Yzk4ODBhMWJjNjUxZmI1ZTIxOTM2MDBkNmQ3MCIsIm5iZiI6MTc1NTg3MTY1OS42OTgsInN1YiI6IjY4YTg3OWFiNDZhODU1OTkyZTcyNTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DdPrlQb9ot2AE-crWwUf69Tjf5o0VGlGzK5b6XYoE5Y",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setFavorite(data.favorite); // set initial favorite state
        } else {
          console.log("Error fetching state:", data);
        }
      } catch (e) {
        console.log("Error:", e);
      }
    };

    fetchAccountState();
  }, [id, media_type]);

  // 🔹 Handle Favorite Toggle
  const handleFavorite = async () => {
    try {
      const favoriteMovie = await fetch(
        "https://api.themoviedb.org/3/account/22248074/favorite",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2Q0Yzk4ODBhMWJjNjUxZmI1ZTIxOTM2MDBkNmQ3MCIsIm5iZiI6MTc1NTg3MTY1OS42OTgsInN1YiI6IjY4YTg3OWFiNDZhODU1OTkyZTcyNTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DdPrlQb9ot2AE-crWwUf69Tjf5o0VGlGzK5b6XYoE5Y",
          },
          body: JSON.stringify({
            media_id: id,
            media_type: media_type, // 👈 movie or tv
            favorite: !favorite,
          }),
        }
      );

      const data = await favoriteMovie.json();
      if (favoriteMovie.ok) {
        setFavorite(!favorite); // toggle UI
      } else {
        console.log("Error:", data);
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className="bg-white position-relative w-100 text-dark rounded-3 shadow-lg w-[200px] p-3 items-center">
      {/* 🔹 Red Heart Badge on top if Favorite */}
      {favorite && (
        <div
          className="position-absolute top-0 start-0 m-2"
          style={{
            background: "red",
            color: "white",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          ❤
        </div>
      )}

      {/* Three Dots Dropdown */}
      <div className="dropdown position-absolute top-0 end-0 m-2">
        <button
          className="btn btn-light btn-sm"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BsThreeDotsVertical />
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button className="dropdown-item" onClick={handleFavorite}>
              {favorite ? "💔 Remove Favorite" : "❤ Favorite"}
            </button>
          </li>
          <li>
            <button className="dropdown-item">➕ Add to List</button>
          </li>
          <li>
            <button className="dropdown-item">📺 Watchlist</button>
          </li>
          <li>
            <button className="dropdown-item">⭐ Your Rating</button>
          </li>
        </ul>
      </div>

      {/* Card Content */}
      <img
        src={poster}
        alt={title}
        className="rounded-lg h-[280px] w-100 object-cover"
      />
      <h3 className="mt-2 text-md font-semibold text-center">{title}</h3>
      <p className="text-gray-400 text-sm">{genre}</p>

      <div className="flex items-center mt-1">
        <FaStar className="text-yellow-400" />
        <span className="ml-1 text-sm">{rating}</span>
      </div>

      <div className="mt-2 d-flex gap-2 w-100">
        <button className="btn btn-primary text-center py-1 rounded-md text-sm hover:bg-blue-700">
          ▶ Watch trailer
        </button>
        <button
          className="btn btn-secondary text-center py-1 rounded-md text-sm hover:bg-blue-700"
          onClick={() => navigate(`/details-page/${media_type}/${id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
