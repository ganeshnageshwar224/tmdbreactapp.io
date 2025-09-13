import MovieDetails from "../movieDetails/MovieDetails"
import Casts from "../casts/Casts"

const DetailsPage = () =>{
    return(
        <div className="movie-container">
            <MovieDetails/>
            <Casts />
        </div>
    )
}

export default DetailsPage