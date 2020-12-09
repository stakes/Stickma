import * as React from 'react';
import {useEffect, useState} from 'react';

export default function Pillters(props) {
    const APIKEY = 'vqixbX9GqzUQGbZCg9e0az1t6ic7h0hd';

    const [terms, setTerms] = useState([]);

    const starterTerms = ['😀', '😍', '🤔', '💯'];
    const randoTerms = ['3d text', 'pusheen', 'high five', 'party', 'nope', 'hell yeah', 'why', 'clap'];

    const onClick = (v) => {
        props.onClick(v);
    };

    useEffect(() => {
        let url = `https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`;
        fetch(url)
            .then((response) => response.json())
            .then((arr) => {
                let terms = [];
                starterTerms.forEach((el) => {
                    terms.push(el);
                });
                let randomTerm = randoTerms[Math.floor(Math.random() * randoTerms.length)];
                terms.push(randomTerm);
                arr.data.forEach((el) => {
                    terms.push(el);
                });
                setTerms(terms);
            });
    }, []);

    return (
        <div className="pillterContainer">
            {!terms.length && <h3>Empty pillters</h3>}
            {terms.map((value) => (
                <div className="pillter" key={value} onClick={() => onClick(value)}>
                    <p>{value}</p>
                </div>
            ))}
        </div>
    );
}
