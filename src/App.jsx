import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Pokemon from "./components/Pokemon.jsx";

function App() {

  const [data, setData] = useState(null);
  const [url, setUrl] = useState(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await axios.get(url);
        // const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("finally");
      }
    }

    fetchPokemonData();
  }, [url]);

  console.log(data);


  return (
    <>
      <section>
        {data && (
            data.results.map((pokemon) => (
                <Pokemon
                    key={pokemon.name}
                    url={pokemon.url}
                />
            ))
        )}

        <button
            disabled={!data?.previous}
            onClick={() => setUrl(data.previous)}
        >
          Vorige
        </button>
        <br/>
        <button
            disabled={!data?.next}
            onClick={() => setUrl(data.next)}
        >
          Volgende
        </button>
      </section>
    </>
  )
}

export default App
