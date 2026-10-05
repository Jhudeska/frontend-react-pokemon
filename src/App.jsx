import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Pokemon from "./components/Pokemon.jsx";

function App() {

  const [data, setData] = useState(null);
  const [url, setUrl] = useState(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchPokemonData() {
      setLoading(true);

      try {
        const response = await axios.get(url);
        // const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("finally");
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [url]);

  console.log(data);


  return (
    <>
      <section>
        {loading && <p>Loading...</p>}

        {!loading && data && (
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
