import * as React from 'react';
import {useState, useEffect, useRef, Suspense} from 'react';
import Searchbar from './Searchbar';
import Pillters from './Pillters';
import StickerList from './StickerList';
import Loader from './Loader';
import '../styles/ui.css';

export default function App() {
    const APIKEY = process.env.GIPHY_API_KEY;
    const [searchString, setSearchString] = useState('');
    // const [loaderLink, setLoaderLink] = useState('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');
    const [stickers, setStickers] = useState([]);
    const [isInfo, setIsInfo] = useState(false);

    const runSearch = (v) => {
        setSearchString(v);
    };

    const updateSearchString = (str) => {
        setSearchString(str);
    };

    const showInfoModal = () => {
        console.log('show info modal');
        setIsInfo(true);
    };

    const hideInfoModal = () => {
        setIsInfo(false);
    };

    let isFirstRun = useRef(true);
    useEffect(() => {
        console.log(process.env.REACT_APP_API_KEY);
        if (isFirstRun.current === true) {
            isFirstRun.current = false;
            return;
        }
        let url = `https://api.giphy.com/v1/stickers/search?api_key=${APIKEY}&q=${searchString}`;
        if (searchString === '') url = `https://api.giphy.com/v1/stickers/trending?api_key=${APIKEY}`;
        fetch(url)
            .then((response) => response.json())
            .then((stickerArray) => {
                let stickers = [];
                stickerArray.data.forEach((el) => {
                    stickers.push({url: el.images['original_still'].url, title: el.title});
                });
                setStickers(stickers);
            });
    }, [searchString]);

    // get trending stickers once initially
    useEffect(() => {
        let url = `https://api.giphy.com/v1/stickers/trending?api_key=${APIKEY}`;
        fetch(url)
            .then((response) => response.json())
            .then((stickerArray) => {
                let stickers = [];
                stickerArray.data.forEach((el) => {
                    stickers.push({url: el.images['original_still'].url, title: el.title});
                });
                setStickers(stickers);
            });
    }, []);

    return (
        <div>
            {isInfo && (
                <div className="infoModalOverlay" onClick={hideInfoModal}>
                    <div className="infoModal">
                        <div className="infoContent">
                            <p>Stickers and sticker search powered by</p>
                            <a href="https://www.giphy.com" target="_blank">
                                <div className="giphyLogo" />
                            </a>
                            <p>
                                Plugin by
                                <br />
                                <a href="https://www.figma.com/@alcor_n_stakes" target="_blank">
                                    Nicholas &amp; Jay
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <div className="appContainer">
                <Searchbar
                    onInfoClick={showInfoModal}
                    onSearch={updateSearchString}
                    searchString={searchString}
                ></Searchbar>
                <Pillters onClick={(v) => runSearch(v)} />
                {!stickers.length && !isFirstRun.current && (
                    // <image src="" alt="" ></image>
                    <p>
                        No stickers matching <em>{searchString}</em>
                    </p>
                )}
                <Suspense fallback={<Loader />}>
                    <StickerList stickers={stickers} />
                </Suspense>
            </div>
        </div>
    );
}
