import * as React from 'react';

const imgCache = {
    __cache: {},
    read(src) {
        if (!this.__cache[src]) {
            this.__cache[src] = new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    this.__cache[src] = true;
                    setTimeout(() => resolve(this.__cache[src]), 250);
                };
                img.src = src;
            }).then(() => {
                this.__cache[src] = true;
            });
        }
        if (this.__cache[src] instanceof Promise) {
            throw this.__cache[src];
        }
        return this.__cache[src];
    },
};

export const Sticker = ({src, ...rest}) => {
    imgCache.read(src);
    return <img className="stickerImg" src={src} {...rest} />;
};
