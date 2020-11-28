import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';
import Searchbar from './Searchbar';
import '../styles/ui.css';

export default function App() {
    const APIKEY = 'vqixbX9GqzUQGbZCg9e0az1t6ic7h0hd';

    const [searchString, setSearchString] = useState('');
    // const [loaderLink, setLoaderLink] = useState('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');
    const [stickers, setStickers] = useState([]);

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

    // do the actual search
    useEffect(() => {
        let url = `https://api.giphy.com/v1/stickers/search?api_key=${APIKEY}&q=${searchString}`;
        fetch(url)
            .then((response) => response.json())
            .then((stickerArray) => {
                console.log(stickerArray);
                let stickers = [];
                stickerArray.data.forEach((el) => {
                    stickers.push(el.images['480w_still'].url);
                });
                setStickers(stickers);
            });
    }, [searchString]);

    // get trending stickers once initially
    useEffect(() => {
        console.log('ONCE');
        let url = `https://api.giphy.com/v1/stickers/trending?api_key=${APIKEY}`;
        fetch(url)
            .then((response) => response.json())
            .then((stickerArray) => {
                console.log(stickerArray);
                let stickers = [];
                stickerArray.data.forEach((el) => {
                    stickers.push(el.images['480w_still'].url);
                });
                setStickers(stickers);
            });
    }, []);

    return (
        <div>
            <Searchbar onSearch={updateSearchString}></Searchbar>
            <h2>big grid o stickers</h2>
            <div className="stickerList">
                {stickers.map((value) => (
                    <div key={value} className="stickerContainer">
                        <img width={128} key={value} src={value} alt="gif" onClick={() => onPlaceSticker(value)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
