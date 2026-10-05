import './App.css'
import axios from "axios";
import Pokemon from "./components/Pokemon.jsx";
import {useEffect, useState} from "react";

function App() {

  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        // const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
        console.log("finally");
      }
    }

    fetchPokemonData();
  }, []);

  console.log(data);

  // if (loading) return <p>Loading...</p>;
  //
  // return <pre>{JSON.stringify(data, null, 2)}</pre>;



  return (
    <>
      <section>
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

        <Pokemon data={data} />

      </section>
    </>
  )
}

export default App
