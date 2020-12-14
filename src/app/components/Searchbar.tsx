import * as React from 'react';
import {useState, useRef, useEffect} from 'react';

export default function Searchbar(props) {
    const [searchString, setSearchString] = useState(props.searchString);
    const searchInput = useRef(null);

    const handleChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            props.onSearch(e.target.value);
        }
    };

    useEffect(() => {
        setSearchString(props.searchString);
    }, [props.searchString]);

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    return (
        <div className="searchBarContainer">
            <input
                className="searchBar"
                placeholder="Search stickers"
                value={searchString}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={searchInput}
            />
            <div className="infoButton" onClick={props.onInfoClick} />
        </div>
    );
}
