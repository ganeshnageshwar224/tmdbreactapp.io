import { useState, useEffect } from "react"

const CardExample = () => {

    const [items, setItems] = useState([]);

    const fetchMovieDetails = async () => {
        const movieDetails = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=5cd4c9880a1bc651fb5e2193600d6d70&language=en-US&page=1")
        const result = await movieDetails.json()
        console.log(result)
        setItems(result.results || []);
    }

    useEffect(() => {
        fetchMovieDetails(); // fetch when activeTab changes
    }, []);


    return (
        <div>
            <h1>Movie Details API</h1>
            {items.map((item) => (
                <div key={item.id}>
                    <h6>{item.id}</h6>
                    <h6>{item.title}</h6>
                    <img src={`https://media.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`} alt="" />
                </div>
            ))}
        </div>
    )
}

export default CardExample

