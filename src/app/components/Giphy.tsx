import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';
import Searchbar from './Searchbar';

export default function App() {
    const [searchString, setSearchString] = useState('');
    const [stickerLink, setStickerLink] = useState('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');

    const onPlaceSticker = useCallback((stickerURL) => {
        let url = stickerURL;
        fetch(url)
            .then((r) => r.arrayBuffer())
            .then((a) => parent.postMessage({pluginMessage: {type: 'place-sticker', data: new Uint8Array(a)}}, '*'))
            .catch((err) => console.error({err}));
    }, []);

    const updateSearchString = (str) => {
        setSearchString(str);
    };

    useEffect(() => {
        let url = 'https://api.giphy.com/v1/stickers/random?api_key=vqixbX9GqzUQGbZCg9e0az1t6ic7h0hd';
        fetch(url)
            .then((response) => response.json())
            .then((stickerLink) => {
                setStickerLink(stickerLink.data.images['480w_still'].url);
            });
    }, [searchString]);

    return (
        <div>
            <Searchbar onSearch={updateSearchString}></Searchbar>
            <h2>One random sticker to test</h2>
            <img width={200} src={stickerLink} alt="gif" onClick={() => onPlaceSticker(stickerLink)} />
        </div>
    );
}
