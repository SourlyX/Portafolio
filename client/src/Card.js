import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const Card = styled.div`
  width: 27%;
  color: #E0E0E0;
  flex-grow: 1;
  background-color: #2C3E50;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-basis: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #34495E;
  }
`

const CardImage = styled.img`
  width: 25%;
  max-width: 125px;
  height: auto;
  border-radius: 8px;
`

const CardTitle = styled.h3`
  margin: 0;
  padding-bottom: 10px;
  color: #55F5ED;
`

const CardDescription = styled.div`
  max-width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #E0E0E0;
`

function Cards({ cards, text }) {
  return (
    <>
      {cards.map((card, index) => (
        <Card key={index}>
          <CardDescription>
            <CardTitle>{card.title}</CardTitle>
            <p>{card.description}</p>
            {card.url && <Button url={card.url} text={text}/>}
          </CardDescription>
          <CardImage src={card.image} alt="Project" />
        </Card>
      ))}
    </>
  )
}

export default Cards;
