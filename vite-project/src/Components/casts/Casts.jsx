import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BudgetDetail from "../budgetDetail/BudgetDetail";

const Casts = () => {
  const { id } = useParams();
  const [casts, setCasts] = useState([]);

  const castsDetails = async () => {
    const fetchCasts = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2Q0Yzk4ODBhMWJjNjUxZmI1ZTIxOTM2MDBkNmQ3MCIsIm5iZiI6MTc1NTg3MTY1OS42OTgsInN1YiI6IjY4YTg3OWFiNDZhODU1OTkyZTcyNTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DdPrlQb9ot2AE-crWwUf69Tjf5o0VGlGzK5b6XYoE5Y",
        },
      }
    );

    const castResult = await fetchCasts.json();
    setCasts(castResult.cast || []);
  };

  useEffect(() => {
    castsDetails();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Top Billed Cast</h4>

        <div className="row">
            <div className="col-md-9">

            
                {/* Horizontal scroll wrapper */}
                <div className="d-flex overflow-auto pb-3" style={{ gap: "15px", scrollbarWidth: "thin" }}>
                    {casts.slice(0, 10).map((actor) => (
                    <div key={actor.id} className="card shadow-sm" style={{ minWidth: "150px", borderRadius: "10px" }}>
                        <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`  : "https://via.placeholder.com/300x450?text=No+Image"} className="card-img-top" alt={actor.name} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", height: "225px", objectFit: "cover" }}/>
                        <div className="card-body p-2">
                        <h6 className="card-title mb-1 fw-bold">{actor.name}</h6>
                        <p className="card-text text-muted small">{actor.character}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            <div className="col-md-3">
                <BudgetDetail/>
            </div>
        </div>
    </div>
  );
};

export default Casts;
