import * as React from 'react';
import {useCallback} from 'react';

export default function Searchbar(props) {
    // const [searchString, setSearchString] = useState("")

    const onKeyDown = useCallback((e) => {
        if (e.code === 'Enter') {
            props.onSearch(e.target.value);
        }
    }, []);

    return (
        <input
            className="searchBar"
            placeholder="Search stickers"
            value={props.value}
            onKeyDown={(e) => onKeyDown(e)}
        />
    );
}
