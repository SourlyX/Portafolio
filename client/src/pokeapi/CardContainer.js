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

/*
function CardContainer({ pokemons }) {
  const [detailedPokemons, setDetailedPokemons] = useState([])
  const [evolutionChain, setChain] = useState([])

  useEffect(() => {
    pokemons.forEach((pokemon) => {
      Axios.get(pokemon.url)
        .then(response => {
          const newPokemon = { ...response.data }
          const index = newPokemon.game_indices[3]?.game_index || 0

          setDetailedPokemons(prevState => {
            // Verifica si ya existe un Pokémon con el mismo índice
            if (prevState.some(p => (p.game_indices[3]?.game_index || 0) === index)) {
              return prevState // Si ya existe, no lo añade
            }

            return [...prevState, newPokemon]
              .sort((a, b) => {
                const indexA = a.game_indices[3]?.game_index || 0
                const indexB = b.game_indices[3]?.game_index || 0
                return indexA - indexB
              })
          })
          return Axios.get(response.data.species.url)
        })
        .then(chain => {
          if (!evolutionChain.some(item => item.url === chain.data.evolution_chain.url)) {
            setChain(prevState => [...prevState, chain.data])
          }
        })
        .catch(error => {
          console.error(Error fetching details for ${pokemon.name}:, error)
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
*/

function CardContainer({ pokemons }) {
  const [detailedPokemons, setDetailedPokemons] = useState([])
  const [evolutionChain, setChain] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Obtenemos detalles de todos los Pokémon
        const detailedDataPromises = pokemons.map(async (pokemon) => {
          const response = await Axios.get(pokemon.url)
          return { ...response.data }
        })

        const detailedData = await Promise.all(detailedDataPromises)

        // Remueve todos los Pokémon duplicados
        const uniquePokemons = detailedData.filter((pokemon, index, self) => {
          const gameIndex = pokemon.game_indices[3]?.game_index || 0
          return (
            self.findIndex(p => (p.game_indices[3]?.game_index || 0) === gameIndex) === index
          )
        }).sort((a, b) => {
          const indexA = a.game_indices[3]?.game_index || 0
          const indexB = b.game_indices[3]?.game_index || 0
          return indexA - indexB
        })

        setDetailedPokemons(uniquePokemons)

        // Obtiene todas las cadenas evolutivas
        const chainPromises = uniquePokemons.map(async (pokemon) => {
          const speciesResponse = await Axios.get(pokemon.species.url)
          const chainsResponse = await Axios.get(speciesResponse.data.evolution_chain.url)
          return chainsResponse.data
        })

        const chains = await Promise.all(chainPromises)

        // Remueve todas las cadenas evolutivas repetidas
        const uniqueChains = chains.filter((chain, index, self) => {
          return self.findIndex(c => c.chain.species.name === chain.chain.species.name)
        })

        setChain(uniqueChains)

        // Generamos los Cards con las cadenas evolutivas asociadas
        const pokemonWithCards = uniquePokemons.map(pokemon => {
          const chainData = hasChain(pokemon.name, uniqueChains)

          // Filtramos los Pokémon de la misma cadena
          const relatedPokemons = uniquePokemons.filter(p => {
            return isPartOfChain(p.name, chainData)
          })

          // Generamos los Cards renderizados de esta cadena
          const relatedCards = relatedPokemons.map(p => (
            <Card key={p.id} pokemon={p} evolutionChain={null} />
          ))

          return (
            <Card key={pokemon.id} pokemon={pokemon} evolutionChain={chainData} pokemonEvolutions={relatedPokemons} />
          )
        })

        setCards(pokemonWithCards)
      } catch (error) {
        console.error("Error fetching Pokémon data:", error)
      }
    }

    fetchPokemonData()
  }, [pokemons])

  const hasChain = (pokemonName, chains) => {
    for (var chainData of chains) {

      let currentChain = chainData.chain

      while (currentChain) {
        if (currentChain.species?.name === pokemonName) return chainData
        currentChain = currentChain.evolves_to[0]
      }
    }
    return null
  }

  const isPartOfChain = (pokemonName, chainData) => {
    if (!chainData || !chainData.chain) return false

    let currentChain = chainData.chain

    while (currentChain) {
      if (currentChain.species?.name === pokemonName) return true
      currentChain = currentChain.evolves_to[0]
    }

    return false
  }

  return (
    <>
      <Title>Pokedex</Title>
      <Container>
        {cards}
      </Container>
    </>
  )
}

export default CardContainer