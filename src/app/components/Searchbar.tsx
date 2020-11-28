import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';

export default function Searchbar(props) {
    const onKeyDown = useCallback((e) => {
        if (e.code === 'Enter') {
            props.onSearch(e.target.value);
        }
    }, []);

    return (
        <input
            placeholder="Search stickers"
            // onChange={(e) => onKeyDown(e)}
            onKeyDown={(e) => onKeyDown(e)}
        />
    );
}
