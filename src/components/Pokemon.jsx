import './Pokemon.css'
import {useEffect, useState} from "react";
import axios from "axios";

function Pokemon({url}){
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const response = await axios.get(url);

                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPokemonData();
    }, [url]);

    return (
        <>

        {data && (
            <article>
                <p>
                    Name:
                    {/*{ " " + data.results[0].name}*/}
                    { " " + data.name}
                </p>

                <p>
                    Image:
                    <img src={data.sprites.front_default} alt={data.name} />
                </p>

                <p>Abilities:</p>

                <ul>
                    {data.abilities.map((item) => (
                        <li key={item.ability.name}>
                            {item.ability.name}
                        </li>
                    ))}
                </ul>

                <p>
                    Weight:
                    { " " + data.weight}
                </p>

                <p>Moves:</p>

                <ul>
                    {data.moves.map((item) => (
                        <li key={item.move.name}>
                            {item.move.name}
                        </li>
                    ))}
                </ul>
            </article>
        )}
        </>
    );

}

export default Pokemon;