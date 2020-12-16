import * as React from 'react';
import {Sticker} from './Sticker';

export default function StickerList(props) {
    const onPlaceSticker = (stickerObj) => {
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
    };

    return (
        <div className="stickerList">
            {props.stickers.map((value) => (
                <div key={value.url} className="stickerContainer">
                    <Sticker
                        width={128}
                        key={value.url}
                        src={value.url}
                        alt="gif"
                        onClick={() => onPlaceSticker(value)}
                    />
                </div>
            ))}
        </div>
    );
}
