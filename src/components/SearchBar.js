import React from 'react';
import '../css/SearchBar.css';

const SearchBar = ({onSearchChange, onSubmit}) => (
    <form
        className="SearchBar"
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
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