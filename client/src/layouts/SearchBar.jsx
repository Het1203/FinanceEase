import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim()) {
            navigate(`/dashboard/search?query=${encodeURIComponent(query.trim())}`);
            setQuery("");
        }
    };

    return (
        <div className="relative mx-50">
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-200 pl-10 pr-4 py-2 rounded-md bg-[#D8CFD0] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B3A9A2]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
    );
}

export default SearchBar;