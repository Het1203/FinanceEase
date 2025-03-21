import { Search } from "lucide-react"

function SearchBar() {
    return (
        <div className="relative mx-50">
            <input
                type="text"
                placeholder="Search"
                className="w-200 pl-10 pr-4 py-2 rounded-md bg-[#D8CFD0] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B3A9A2]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
    )
}

export default SearchBar

