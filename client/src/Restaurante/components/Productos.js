import React, { Component } from "react";
import Producto from './Producto'
import '../index.css'

class Productos extends Component {

  render() {
    const {productos, guarniciones, addToCart, carro, referencias, referenciasMenu} = this.props
    return(
      <div className="menu">
        {productos.map(producto =>
          <Producto
            addToCart={addToCart}
            key={producto.id_plato}
            producto={producto}
            guarniciones={guarniciones}
            referencias = {referencias}
            referenciasMenu = {referenciasMenu}
            carro={carro.map(el => el.name === producto.name
              ? el
              : null)}
            popup = {producto.tipo_menu === 1 ? true : false}
          />
        )}
      </div>
    )
  }
}

export default Productos