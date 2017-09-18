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
                    this.input.value = '';
                }}
            >
                <input
                    className="input"
                    placeholder="Enter player name"
                    ref={node => {
                        this.input = node
                    }}
                    onChange={onSearchChange}
                >
                </input>
            </form>
        </div>
        <div>
            <CustomButton
                className="button"
                onClick={() => {
                    onSubmit();
                    this.input.value = '';
                }}/>
        </div>
    </div>
);

export default SearchBar;