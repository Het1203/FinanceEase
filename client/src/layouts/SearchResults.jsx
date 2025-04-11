import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const query = searchParams.get("query");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/search?query=${query}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setResults(data.results);
                } else {
                    const errorData = await response.json();
                    console.error("Failed to fetch search results:", errorData.error);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    const handleResultClick = (result) => {
        navigate(result.url);
    };

    return (
        <div className="p-4 ml-5">
            <h1 className="text-3xl font-bold text-[#4A4A4A] mb-2">Search Results for "{query}"</h1>
            {results.length > 0 ? (
                <ul>
                    {results.map((result) => (
                        <li
                            key={result.id}
                            className="p-2 border-b rounded cursor-pointer hover:bg-[#D8CFD0]"
                            onClick={() => handleResultClick(result)}
                        >
                            <h2 className="text-[#102647] text-xl font-bold">{result.title}</h2>
                            <p className="text-xm text-dark">{result.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-xl mt-4">No results found.</p>
            )}
        </div>
    );
}

export default SearchResults;