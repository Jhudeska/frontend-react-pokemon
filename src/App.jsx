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
  const [error, setError] = useState(null);



  useEffect(() => {

    const controller = new AbortController();

    async function fetchPokemonData() {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url, {
          signal: controller.signal
        });
        // const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");


        console.log(response.data);
        setData(response.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          return;
        }
        console.error(error);
        setError(
            "Er is iets misgegaan met het ophalen van de Pokémon."
        );
      } finally {
        console.log("finally");
        setLoading(false);
      }
    }

    fetchPokemonData();

    return () => {
      controller.abort();
    };


  }, [url]);

  console.log(data);


  return (
    <>
      <section>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && data && (
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
