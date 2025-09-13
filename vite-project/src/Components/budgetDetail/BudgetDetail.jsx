import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BudgetDetail = () => {
    const { id } = useParams();
    const [budget, setBudget] = useState(null);

    const detailsBudget = async () => {
        const fetchBudget = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
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

        const budgetResult = await fetchBudget.json();
        console.log(budgetResult, "budgettttt");
        setBudget(budgetResult);
    };

    useEffect(() => {
        detailsBudget();
    }, [id]);

    // ✅ Show loading until data is ready
    if (!budget) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div className="card p-3 shadow-sm">
            <h6 className="py-4"><strong>Status:</strong> {budget.status}</h6>
            <h6 className="py-4"><strong>Original Language:</strong> {budget.original_language}</h6>
            <h6 className="py-4"><strong>Budget:</strong> ${budget.budget ? budget.budget.toLocaleString() : "N/A"}</h6>
            <h6 className="py-4"><strong>Revenue:</strong> ${budget.revenue ? budget.revenue.toLocaleString() : "N/A"}</h6>
        </div>
    );
};

export default BudgetDetail;
