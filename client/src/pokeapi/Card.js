import React from "react";
import styled from "styled-components";

const CardStyled = styled.div`
  width: 150px;
  height: 200px;
  margin: 10px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Card({ pokemon }) {
  return (
    <CardStyled>
      <h2>{pokemon.name}</h2>
      {/* Aquí mostramos una imagen si existe */}
      {pokemon.sprites && pokemon.sprites.front_default && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
    </CardStyled>
  );
}

export default Card;
