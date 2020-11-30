import * as React from 'react';
import {useState, useEffect, useCallback, useRef} from 'react';
import Searchbar from './Searchbar';
import Pillters from './Pillters';
import '../styles/ui.css';

export default function App() {
    const APIKEY = 'vqixbX9GqzUQGbZCg9e0az1t6ic7h0hd';

    const [searchString, setSearchString] = useState('');
    // const [loaderLink, setLoaderLink] = useState('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');
    const [stickers, setStickers] = useState([]);

    const onPlaceSticker = useCallback((stickerObj) => {
        let url = stickerObj.url;
        fetch(url)
            .then((r) => r.arrayBuffer())
            .then((a) =>
                parent.postMessage(
                    {pluginMessage: {type: 'place-sticker', data: new Uint8Array(a), title: stickerObj.title}},
                    '*'
                )
            )
            .catch((err) => console.error({err}));
    }, []);

    const runSearch = (v) => {
        setSearchString(v);
    };

    const updateSearchString = (str) => {
        setSearchString(str);
    };

    let isFirstRun = useRef(true);
    useEffect(() => {
        console.log('search');
        if (isFirstRun.current === true) {
            isFirstRun.current = false;
            return;
        }
        let url = `https://api.giphy.com/v1/stickers/search?api_key=${APIKEY}&q=${searchString}`;
        fetch(url)
            .then((response) => response.json())
            .then((stickerArray) => {
                console.log(stickerArray);
                let stickers = [];
                stickerArray.data.forEach((el) => {
                    stickers.push({url: el.images['original_still'].url, title: el.title});
                });
                setStickers(stickers);
            });
    }, [searchString]);

    // get trending stickers once initially
    useEffect(() => {
        console.log('trending');
        let url = `https://api.giphy.com/v1/stickers/trending?api_key=${APIKEY}`;
        fetch(url)
            .then((response) => response.json())
            .then((stickerArray) => {
                console.log(stickerArray);
                let stickers = [];
                stickerArray.data.forEach((el) => {
                    stickers.push({url: el.images['original_still'].url, title: el.title});
                });
                setStickers(stickers);
            });
    }, []);

    return (
        <div>
            <Searchbar onSearch={updateSearchString} value={searchString}></Searchbar>
            <Pillters onClick={(v) => runSearch(v)} />
            {!stickers.length && !isFirstRun.current && (
                // <image src="" alt="" ></image>
                <p>
                    No stickers matching <em>{searchString}</em>
                </p>
            )}
            <div className="stickerList">
                {stickers.map((value) => (
                    <div key={value.url} className="stickerContainer">
                        <img
                            width={128}
                            key={value.url}
                            src={value.url}
                            alt="gif"
                            onClick={() => onPlaceSticker(value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
