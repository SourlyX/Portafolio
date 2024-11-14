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
    var counter
    for (counter = 0; counter < evolutionChain.length; counter++) {
      if (evolutionChain[counter].chain.species.name === pokemonName || evolutionChain[counter].chain.evolves_to[0].species.name === pokemonName || evolutionChain[counter].chain.evolves_to[0].evolves_to[0].species.name === pokemonName) {
        return evolutionChain[counter]
        break
      }
    }
  }

  return (
    <>
    <Title>Pokedex</Title>
    <Container>
      {detailedPokemons.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon} evolutionChain = {evolutionChain} />
      ))}
    </Container>
    </>
  )
}


export default CardContainer