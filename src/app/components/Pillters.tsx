import * as React from 'react';
import {useEffect, useState} from 'react';

export default function Pillters(props) {
    const APIKEY = 'vqixbX9GqzUQGbZCg9e0az1t6ic7h0hd';

    const [terms, setTerms] = useState([]);

    const starterTerms = ['😀', '😍', '🤔', '💯'];
    const randoTerms = ['3d text', 'pusheen', 'high five', 'party', 'nope', 'hell yeah', 'why', 'clap'];

    useEffect(() => {
        let url = `https://api.giphy.com/v1/trending/searches?api_key=${APIKEY}`;
        fetch(url)
            .then((response) => response.json())
            .then((arr) => {
                let terms = [];
                starterTerms.forEach((el) => {
                    terms.push(el);
                });
                const shuffled = randoTerms.sort(() => Math.random() - 0.5);
                const randomTwo = shuffled.slice(0, 2);
                randomTwo.forEach((el) => {
                    terms.push(el);
                });
                arr.data.forEach((el) => {
                    terms.push(el);
                });
                setTerms(terms);
            });
    }, []);

    return (
        <div>
            {terms.length && (
                <div className="pillterContainer">
                    {terms.map((value, index) => (
                        <div className="pillter" key={index} onClick={() => props.onClick(value)}>
                            <p>{value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
