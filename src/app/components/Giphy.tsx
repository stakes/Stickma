import * as React from 'react';
import {useState, useEffect} from 'react';

export default function App() {
    const [stickerLink, setStickerLink] = useState('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');

    const onPlaceSticker = React.useCallback((stickerURL) => {
        let url = stickerURL;
        fetch(url)
            .then((r) => r.arrayBuffer())
            .then((a) => parent.postMessage({pluginMessage: {type: 'place-sticker', data: new Uint8Array(a)}}, '*'))
            .catch((err) => console.error({err}));
        // parent.postMessage({pluginMessage: {type: 'place-sticker', url: stickerURL}}, '*');
    }, []);

    useEffect(() => {
        let url = 'https://api.giphy.com/v1/stickers/random?api_key=vqixbX9GqzUQGbZCg9e0az1t6ic7h0hd';

        fetch(url)
            .then((response) => response.json())
            .then((stickerLink) => {
                setStickerLink(stickerLink.data.images['480w_still'].url);
            });
    }, []);

    return (
        <div>
            <h2>One random sticker to test</h2>
            <img width={200} src={stickerLink} alt="gif" onClick={() => onPlaceSticker(stickerLink)} />
        </div>
    );
}

// image fetching only works in the UI for some reason
// onmessage = (e) => {
//     let message = event.data.pluginMessage;
//     if (message.type === 'getImageData') {
//         let url = e.data.pluginMessage.url
//         fetch(url)
//           .then(r => r.arrayBuffer())
//           .then(a => parent.postMessage({ pluginMessage: {type: 'image-data-received', data: new Uint8Array(a), settings}}, '*'))
//           .catch(err => console.error({ err }))
//     } else if (message.type === 'settings') {
//       settings = message.settings;
//       applyColors()
//       document.body.className = message.settings.tab;
//     }
//   }
