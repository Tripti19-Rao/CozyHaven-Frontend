import { useContext } from "react"
import SearchContext from "../../ContextApi/searchContext"

export default function SearchResults() {
    const {searchResults} = useContext(SearchContext)
    console.log(searchResults)
    return (
        <h1>Search result  - {searchResults.data.length}</h1>
    )
}