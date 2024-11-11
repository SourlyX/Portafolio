import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Axios from "axios";

const Container = styled.div`
  background-color: #1F1F1F;
  width: 95%;
`;

function CardContainer({ pokemons }) {
  const [detailedPokemons, setDetailedPokemons] = useState([]);

  useEffect(() => {
    pokemons.forEach((pokemon) => {
      Axios.get(pokemon.url)
        .then(response => {
          setDetailedPokemons(prevState => [...prevState, { name: pokemon.name, ...response.data }]);
        })
        .catch(error => {
          console.error(`Error fetching details for ${pokemon.name}:`, error);
        });
    });
  }, [pokemons]);

  return (
    <Container>
      <h1>Pokedex</h1>
      {detailedPokemons.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon} />
      ))}
    </Container>
  );
}

export default CardContainer;