import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Axios from "axios"
import CardContainer from "./CardContainer"

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then(response => {
        setPokemons(response.data.results) // Saves the pokemons in the pokemons useState constant
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
  }, [])

  return (
    <CardContainer pokemons={(pokemons)}/>
  )
}

export default Pokedex