import React, { Component } from "react";
import BubbleAlert from './BubbleAlert'
import DetallesCarro from './DetallesCarro'

const styles = {
  carro: {
    backgroundColor: '#359A2C',
    color: '#fff',
    border: 'none',
    padding: '15px',
    borderRadius: '15px',
    cursor: 'pointer',
  },
  bubble: {
    position: 'relative',
    left: 12,
    top: 20,
  }
}

class Carro extends Component{
  render () {

    const {carro, esCarroVisible, showCart, removeFromCart} = this.props
    const cantidad = carro.length

    return(
      <div>
        <span style={styles.bubble}>
          {cantidad !== 0
          ?<BubbleAlert value={cantidad}/>
          : null}
        </span>
        <button onClick={showCart} style={styles.carro}>
          Orden
        </button>
        {esCarroVisible ? <DetallesCarro carro={carro} removeFromCart={removeFromCart} /> : null}
      </div>
    )
  }
}

export default Carro