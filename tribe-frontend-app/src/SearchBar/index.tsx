import React, { useState } from 'react';
import './SearchBar.css';

//A few things we need to know if we are going to have a initial 

function SearchBar() {
    const URL = ""
    const INITIAL_VALUE = { search: ""}
    const [searchResult, setSearchResult] = useState(INITIAL_VALUE);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setSearchResult(currSearch => ({...currSearch, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // fetch(URL)
        // .then(res => res.json())
        // .then(json => console.log(json))
    }

    return(
        <div className="SearchBar">
            <img src='../images.png'/>
            <span>
                <form  onSubmit={handleSubmit}>
                    <input placeholder="Search" name="search" value={searchResult.search} onChange={handleChange}/>
                    <button type="submit">Search</button>
                </form>
            </span>
        </div>
    )
}

export default SearchBar