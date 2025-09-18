import MovieDetails from "../../Components/movieDetails/MovieDetails"
import Casts from "../../Components/casts/Casts"

const DetailsPage = () =>{
    return(
        <div className="movie-container">
            <MovieDetails/>
            <Casts />
        </div>
    )
}

export default DetailsPage