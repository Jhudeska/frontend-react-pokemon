import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";

function App() {

  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");

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
        <article>
          <p>
            Name:
            {/*{data.data.result[0].name}*/}
          </p>
          <p>
            Image:
            {/*{data.image}*/}
          </p>
          <p>
            Abilities:

          </p>
          <p>
            Weight:
          </p>
          <p>
            Moves:
          </p>
        </article>




      </section>
    </>
  )
}

export default App
