import { useEffect, useState } from "react";

const DumyAPI = () => {
    const [productsss, setResponse] = useState([]);

    // Non API KEY Data Fetching
    const fetchData = async () => {
        const response = await fetch("https://dummyjson.com/products");
        // console.log(response);
        const result = await response.json()
        console.log(result.products);
        setResponse(result.products)
    }

    // With API KEY Data Fetching

    const fetchMovieData = async () =>{
        const movieResponse = await fetch ("https://api.themoviedb.org/3/movie/popular?api_key=5cd4c9880a1bc651fb5e2193600d6d70&language=en-US&page=1");
        const movieResult = await movieResponse.json();
        console.log(movieResult, "movie datttaaatttaaaa");
    }

    useEffect(() => {
        fetchData(),
        fetchMovieData()
    })

    return (
        <>
            <div className="row">

                {
                    productsss.map((product, index) => {
                        return (

                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="img-top">
                                            <img src={product.thumbnail} alt="" />
                                        </div>
                                        <div className="card-title">{product.title}</div>
                                        <div className="card-text">{product.description}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }
            </div>

        </>
    )
}
export default DumyAPI