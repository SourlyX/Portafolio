import React, { Component } from "react";
import Popup from "./Popup";
import '../index.css'

class Producto extends Component {
  
  constructor(props){
    super(props)
    this.rerenderParent = this.rerenderParent.bind(this)
    this.state = {
      dishVisible: this.props.producto.isDishVisible,
    }
  }

  rerenderParent() {
    this.props.producto.isDishVisible = false
    this.forceUpdate()
  }

  render(){
    const {producto, guarniciones, addToCart, referencias, referenciasMenu, popup} = this.props
    return(
      <div className="producto">
      { producto.estado
      ? <>
      <div className="contenedor">
        <input
          type="image"
          className="img"
          alt={producto.descripcion} 
          src={producto.img}
          onClick= {popup ? () => {producto.isDishVisible = true; this.forceUpdate()} : () => {addToCart(producto, []); this.forceUpdate()}}
        />
        <span className="titulo">{producto.name}</span>
      </div>
        <label className="apagado">Agotado</label>
        </>
      : <div className="posicion">
      <img
          className="img grayout"
          alt={producto.name} 
          src={producto.img}
        />
        <label className="texto-centrado">Agotado</label>
        </div>
        }
        
        { producto.isDishVisible && popup
          ? <Popup
            producto = {producto}
            guarniciones = {guarniciones}
            addToCart = {addToCart}
            rerenderParent={this.rerenderParent}
            changeVisibility={this.changeVisibility}
            referencia = {referenciasMenu.filter(ref => ref.id_plato === producto.id_plato)[0]}
            referencias = {referencias}
          />
          : null}
      </div>
    )
  }
}

export default Producto