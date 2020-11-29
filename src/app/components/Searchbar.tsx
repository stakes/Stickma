import * as React from 'react';
import {useCallback} from 'react';

export default function Searchbar(props) {
    const onKeyDown = useCallback((e) => {
        if (e.code === 'Enter') {
            props.onSearch(e.target.value);
        }
    }, []);

    return <input className="searchBar" placeholder="Search stickers" onKeyDown={(e) => onKeyDown(e)} />;
}
