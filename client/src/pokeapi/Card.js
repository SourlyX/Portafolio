import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Axios from "axios"

const CardStyled = styled.div`
  width: 20%;
  min-width: 300px;
  height: 400px;
  margin: 10px;
  color: #E0E0E0;
  background-color: #2C3E50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Stats = styled.div`
  position: relative;
  border-radius: 15px;
  background-color: #333;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  height: 40%;
  margin-bottom: 3%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, #111, #2C3E50);
    z-index: 2;
    border-radius: 15px;
  }

  > div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const StatItem = styled.div`
  z-index: 3;
  height: 10%;
  margin-right: 3px;
  font-size: 14px;
  color: #c5c5c5;
`

const Pok = styled.img`
  height: 40%;
  width: auto;
  margin-top: 3%;

  &:hover{
    cursor: pointer;
  }
`

function Card({ pokemon, evolutionChain }) {
  if (pokemon.name === "eevee"){
    console.log(evolutionChain)
  }
  if (pokemon.name === "charmander") {
    console.log(evolutionChain)
  }

  return (
    <CardStyled>
      <Pok src="" alt={`${pokemon.name}`}></Pok>
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <Stats>
        {pokemon.stats.map((stat, index) => (
          <div key={index}>
            <StatItem>{stat.stat.name}:</StatItem>
            <StatItem>{stat.base_stat}</StatItem>
          </div>
        ))}
      </Stats>
    </CardStyled>
  )
}

export default Card
