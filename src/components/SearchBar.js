import React from 'react';
import '../css/SearchBar.css';

const SearchBar = () => (
    <form
        className="SearchBar"
        onSubmit={(e) => {
            e.preventDefault();
        }}
    >
        <input
            className="input"
        >
        </input>
    </form>
);

export default SearchBar;