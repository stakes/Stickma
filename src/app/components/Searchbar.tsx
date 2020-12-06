import * as React from 'react';
import {useState} from 'react';

export default function Searchbar(props) {
    const [searchString, setSearchString] = useState(props.searchString);

    const handleChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            props.onSearch(e.target.value);
        }
    };

    React.useEffect(() => {
        setSearchString(props.searchString);
    }, [props.searchString]);

    return (
        <input
            className="searchBar"
            placeholder="Search stickers"
            value={searchString}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
}
