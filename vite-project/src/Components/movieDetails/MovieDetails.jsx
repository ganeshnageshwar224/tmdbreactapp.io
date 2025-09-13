import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import './MovieDetails.css'

const MovieDetails = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);

    const detailsMovie = async () => {
        const fetchPopularMovies = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            method: "GET",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2Q0Yzk4ODBhMWJjNjUxZmI1ZTIxOTM2MDBkNmQ3MCIsIm5iZiI6MTc1NTg3MTY1OS42OTgsInN1YiI6IjY4YTg3OWFiNDZhODU1OTkyZTcyNTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DdPrlQb9ot2AE-crWwUf69Tjf5o0VGlGzK5b6XYoE5Y"
            },


        });

        const movieResult = await fetchPopularMovies.json()
        console.log(movieResult, "neeeeeeeeeeeeeeeeeeeeee");
        setMovie(movieResult);
    }

    const fetchTrailer = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
            method: "GET",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2Q0Yzk4ODBhMWJjNjUxZmI1ZTIxOTM2MDBkNmQ3MCIsIm5iZiI6MTc1NTg3MTY1OS42OTgsInN1YiI6IjY4YTg3OWFiNDZhODU1OTkyZTcyNTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DdPrlQb9ot2AE-crWwUf69Tjf5o0VGlGzK5b6XYoE5Y"
            },
        });
        const data = await res.json();

        console.log(data, "Trailerrrrr")

        // Find the first video of type "Trailer" and site "YouTube"
        const trailerVideo = data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailerVideo) {
            setTrailer(trailerVideo.key);
        }
    };

    useEffect(() => {
        detailsMovie();
        fetchTrailer();
    }, [id])

    return (
        <>
            <div className="movie-details-container">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-12 col-md-3 col-lg-3">
                            <div className="detail-img">
                                {movie && (
                                    <img className="w-100 rounded-3" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-9 col-lg-9">
                            <div className="detail-content-container">
                                <div className="detail-content">
                                    <div className="detail-header-text text-white">
                                        <div>
                                            <h1>{movie?.title}</h1>
                                        </div>

                                        <div className="movie-info text-white">
                                            <span><strong>Release Date:</strong> {movie?.release_date}</span><br />
                                            <span><strong>Runtime:</strong> {movie?.runtime} min</span><br /> <span><strong>Rating:</strong> ⭐ {movie?.vote_average} / 10 ({movie?.vote_count} votes)</span><br />
                                            <span><strong>Genres:</strong> {movie?.genres?.map(g => g.name).join(", ")}</span>
                                        </div>

                                        <div className="movie-actions mt-3">
                                            <button className="btn btn-outline-primary">Add to List</button>
                                            <button className="btn btn-outline-danger ms-2">❤ Favorite</button>
                                            <button className="btn btn-outline-warning ms-2">+ Watchlist</button>
                                            {/* Play Trailer Button */}
                                            {trailer && (
                                                <button className="btn btn-outline-success ms-2" data-bs-toggle="modal" data-bs-target="#trailerModal">▶ Play Trailer</button>
                                            )}
                                        </div>

                                        <div className="overview-title mt-4">Overview</div>
                                        <p>{movie?.overview}</p>

                                        <div className="btn btn-outline-primary"><Link className="text-decoration-none text-white" to={"/home"}>Back To All Movies</Link></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal */}
            <div
                className="modal fade"
                id="trailerModal"
                tabIndex="-1"
                aria-labelledby="trailerModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content bg-dark">
                        <div className="modal-header border-0">
                            <h5 className="modal-title text-white" id="trailerModalLabel">
                                {movie?.title} - Trailer
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body p-0">
                            {trailer ? (
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${trailer}`}
                                    title="Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <p className="text-white text-center">Trailer not available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MovieDetails