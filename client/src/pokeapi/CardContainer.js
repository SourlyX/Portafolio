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
          setDetailedPokemons(prevState => [...prevState, { name: pokemon.name, ...response.data }])
          return Axios.get(`${response.data.evolution_chain.url}`)
        })
        .then(chain => {
          var counter
          var inside = false
          for (counter = 0; counter < evolutionChain.length; counter++) {
            if (evolutionChain[counter] === chain.data) {
              inside = true
              break
            }
          }
          if (!inside){ setChain(chain.data) }
          setChain(chain.data)
        })
        .catch(error => {
          console.error("Error fetching details for ${pokemon.name}: ", error)
        })
    })
  }, [pokemons])

  const hasChain = (pokemonName) => {
    for (let counter = 0; counter < evolutionChain.length; counter++) {
      const chain = evolutionChain[counter].chain
  
      // Caso 1: Si el Pokémon está en el nodo principal de la cadena
      if (chain.species.name === pokemonName) {
        console.log (evolutionChain[counter])
        return evolutionChain[counter]
      }
  
      // Caso 2: Si hay múltiples evoluciones, buscar en evolves_to
      for (let cantEv = 0; cantEv < chain.evolves_to.length; cantEv++) {
        const evolution = chain.evolves_to[cantEv];
  
        // Si el Pokémon está en el nodo de la primera evolución
        if (evolution.species.name === pokemonName) {
          console.log(pokemonName)
          return evolutionChain[counter]
        }
  
        // Si el Pokémon está en el nodo de la segunda evolución
        for (let mulEvo = 0; mulEvo < evolution.evolves_to.length; mulEvo++) {
          if (evolution.evolves_to[mulEvo].species.name === pokemonName) {
            return evolutionChain[counter]
          }
        }
      }
    }
  
    // Retornar null si no se encuentra la cadena
    return null;
  };

  return (
    <>
    <Title>Pokedex</Title>
    <Container>
      {detailedPokemons.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon} evolutionChain = {hasChain(pokemon.name)} />
      ))}
    </Container>
    </>
  )
}


export default CardContainer