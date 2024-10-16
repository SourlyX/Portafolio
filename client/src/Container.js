import React from 'react'
import styled from 'styled-components'
import Cards from './Card'

const CardContainer = styled.div`
  justify-self: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: 2px solid #3B3F46;
  width: 90%;
  padding: 20px;
  background-color: #1F1F1F;
  border-radius: 8px;
  margin-bottom: 50px;
`

const Title = styled.h1`
  justify-self: center;
  width: 100%;
  text-align: center;
  color: #55F5ED;
  margin-bottom: 20px;
  margin-top: 50px;
`

function Container({ cards, title, text }) {
  return (
    <>
      <Title>{title}</Title>
      <CardContainer>
        <Cards
          cards={cards}
          text={text}
          style={{ width: cards.url ? '50%' : 'auto' }}/>
        </CardContainer>
    </>
  )
}

export default Container
