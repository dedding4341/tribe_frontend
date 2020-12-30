import React, { useState } from 'react';
import { Button, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css';

//A few things we need to know if we are going to have a initial 

function SearchBar() {
    const URL = ""
    const INITIAL_VALUE = { search: "" }
    const [searchResult, setSearchResult] = useState(INITIAL_VALUE);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setSearchResult(currSearch => ({ ...currSearch, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // fetch(URL)
        // .then(res => res.json())
        // .then(json => console.log(json))
    }

    return (
        <Form onSubmit={handleSubmit} className="SearchBar">
            <Row className="SearchBar-row d-flex justify-content-around">
                <span className="SearchBar-input-container d-flex align-items-center col-7">
                    <FontAwesomeIcon size="2x" icon={faSearch}></FontAwesomeIcon>
                    <Form.Control className="SearchBar-input" autoComplete="off" placeholder="Search" name="search" value={searchResult.search} onChange={(evt: any) => handleChange(evt)}></Form.Control>
                </span>
                <Button className="SearchBar-submit col-3" type="submit">Filter</Button>
            </Row>
        </Form>
    )
}

export default SearchBar