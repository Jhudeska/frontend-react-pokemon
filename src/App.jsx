import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Pokemon from "./components/Pokemon.jsx";

function App() {

  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
        // const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");

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
            data.results.map((pokemon) => (
                <Pokemon
                    key={pokemon.name}
                    url={pokemon.url}
                />
            ))
        )}
      </section>
    </>
  )
}

export default App
