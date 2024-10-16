import React, { Component } from "react";
import Productos from "./Productos";

class Menu extends Component{

  constructor(props) {
    super(props);
    this.state = {
        menu: this.props.tiposPlato[0]
    }
  }
  
  handleChange = ({target}) => {
    this.setState((state) => ({
      ...state,
      [target.name]: target.value
    }))
  }

  render(){
    const {addToCart, productos, postres, bebidas, guarniciones, carro, referencias, referenciasMenu, tiposPlato, terminosCarne} = this.props
    //console.log(tiposPlato)
    return(
      <div>
        <div className="line">
        {tiposPlato.map(tipo => {
          return <input
            onClick={this.handleChange}
            key={tipo}
            className="fullwidth"
            name="menu"
            type="submit"
            value={tipo}
          />
        })}
      </div>
        <Productos
          addToCart = {addToCart}
          productos = {this.state.menu === tiposPlato[1]
            ? guarniciones
            : this.state.menu === tiposPlato[2]
              ? bebidas
              : this.state.menu === tiposPlato[3]
                ? postres
                : productos}
          guarniciones = {guarniciones}
          terminosCarne = {terminosCarne}
          carro = {carro}
          referencias = {referencias}
          referenciasMenu = {referenciasMenu}
        />
      </div>
    )
  }
}

export default Menu