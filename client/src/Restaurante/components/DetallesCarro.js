import React, { Component } from "react";

const styles = {
  detallesCarro: {
    backgroundColor: '#fff',
    position: 'absolute',
    marginTop: '30',
    boxShadow: '1px 5px 5px rgb(0, 0, 0, 0.3)',
    borderRadius: '5px',
    width: '400px',
    right: 50,
    zIndex: 2
  },
  ul: {
    margin: 0,
    padding: 0,
  },
  producto: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 20px',
    borderBottom: 'solid 1px #aaa'
  }
}

class DetallesCarro extends Component{
  render(){
    const {carro, removeFromCart} = this.props
    return(
      <div style={styles.detallesCarro}>
        <ul style={styles.ul}>
          {carro.map(x => 
            <li style={styles.producto} key={x[0].numero}>
              <img alt={x[0].name} src={x[0].img} width='50' />
              <div>
                {x[0].name}
                {x[1].map(item =>
                  <div key={item}>
                    <span className="input complementos" key={item[0]}>{item[0]}: </span>
                    { Array.isArray(item[1])
                    ? item[1].map(guarnicion =>
                      <span className="input complementos" key={guarnicion}>{guarnicion}</span>)
                    : <span className="complementos">{item[1]}</span>}
                  </div>)}
              </div>
              <input
                type="image"
                alt={"eliminar"}
                src="../productos/garbage.png"
                width="30"
                onClick={() => removeFromCart(x)}/>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default DetallesCarro