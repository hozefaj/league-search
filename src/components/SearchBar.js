import React from 'react';
import '../css/SearchBar.css';

const SearchBar = ({onSearchChange}) => (
    <form
        className="SearchBar"
        onSubmit={(e) => {
            e.preventDefault();
        }}
    >
        <input
            className="input"
            onChange={onSearchChange}
        >
        </input>
    </form>
);

export default SearchBar;