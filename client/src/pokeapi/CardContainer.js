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
  const [evolutionChain, setChain] = useState([])

  useEffect(() => {
    pokemons.forEach((pokemon) => {
      Axios.get(pokemon.url)
        .then(response => {
          setDetailedPokemons(prevState => [...prevState, { ...response.data }])
          return Axios.get(response.data.species.url)
        })
        .then(speciesData => {
          const evolutionUrl = speciesData.data.evolution_chain.url
          return Axios.get(evolutionUrl)
        })
        .then(chainData => {
          if (!evolutionChain.some(item => item.url === chainData.data.url)) {
            setChain(prevState => [...prevState, chainData.data])
          }
        })
        .catch(error => {
          console.error(`Error fetching details for ${pokemon.name}:`, error)
        })
    })
  }, [pokemons])

  const hasChain = (pokemonName) => {
    for (let chainData of evolutionChain) {
      if (!chainData || !chainData.chain) continue

      let currentChain = chainData.chain

      while (currentChain) {
        if (currentChain.species?.name === pokemonName) return chainData
        currentChain = currentChain.evolves_to[0]
      }
    }
    return null
  }

  return (
    <>
      <Title>Pokedex</Title>
      <Container>
        {detailedPokemons.map((pokemon, index) => (
          <Card key={index} pokemon={pokemon} evolutionChain={hasChain(pokemon.name)} />
        ))}
      </Container>
    </>
  )
}

export default CardContainer