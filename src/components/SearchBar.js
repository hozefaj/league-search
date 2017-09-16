import React from 'react';
import '../css/SearchBar.css';
import Button from 'material-ui/Button';

const SearchBar = ({onSearchChange, onSubmit}) => (
    <div className="container">
        <div>
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
        </div>
        <div>
            <Button className="button">
                PRESS ME
            </Button>
        </div>
    </div>
);

export default SearchBar;