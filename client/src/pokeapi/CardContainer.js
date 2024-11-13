import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Card from "./Card"
import Axios from "axios"

const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 40px;
  color: white;
`


const Container = styled.div`
  background-color: #1F1F1F;
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  justify-content: center;
`


function CardContainer({ pokemons }) {
  const [detailedPokemons, setDetailedPokemons] = useState([])

  useEffect(() => {
    pokemons.forEach((pokemon) => {
      Axios.get(pokemon.url)
        .then(response => {
          setDetailedPokemons(prevState => [...prevState, { name: pokemon.name, ...response.data }])
        })
        .catch(error => {
          console.error("Error fetching details for ${pokemon.name}: ", error)
        })
    })
  }, [pokemons])

  return (
    <>
    <Title>Pokedex</Title>
    <Container>
      {detailedPokemons.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon} />
      ))}
    </Container>
    </>
  )
}


export default CardContainer