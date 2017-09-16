import React from 'react';
import '../css/SearchBar.css';
import CustomButton from './CustomButton';

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
            <CustomButton
                className="button"
                onClick={onSubmit}/>
        </div>
    </div>
);

export default SearchBar;