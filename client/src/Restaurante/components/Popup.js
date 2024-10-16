import React, { Component } from "react";
import Input from "./Input";
import Button from "./Button";
import '../index.css'

class Popup extends Component{
  constructor(props) {
    super(props);
    this.rerenderParent = this.rerenderParent.bind(this)
    this.state = {
        termino: "MEDIO",
        guarnicion: new Array(this.props.referencia.guarniciones.length).fill(false),
        nota: "",
    }
  }

  rerenderParent() {
    this.props.rerenderParent()
  }

  submit = (e) => {
    if (this.validGuarniciones() === this.props.producto.no_guarniciones){
      e.preventDefault()
      const data = Array.from(new FormData(e.target))
      this.props.addToCart(this.props.producto, data)
      this.rerenderParent()
    }
  }
  
  handleChange = ({target}) => {
    this.setState((state) => ({
      ...state,
      [target.name]: target.value
    }))
  }

  handleCheckbox = (position) => {
    const updateCheckedState = this.state.guarnicion.map((item, index) =>
      index === position ? !item : item
    )
    this.setState({guarnicion: updateCheckedState})
    if(this.validGuarniciones() !== this.props.producto.no_guarniciones){
      this.setState({boton: true})
    }else{
      this.setState({boton: false})
    }
  }

  validGuarniciones = () => {
    var contador = 0
    for(var i=0; i < this.state.guarnicion.length; i++){
      if(this.state.guarnicion[i] === true){contador++}
    }
    return contador
  }

  render() {
    const {producto, referencia, referencias} = this.props
    return(
      <div className="popup">
        <div className="contenedor">
          <img
            type="image"
            className="img"
            alt={producto.name} 
            src={producto.img}
          />
          <h2>{producto.name}</h2>
          <form className="form" onSubmit={this.submit}>
            { referencia.terminosCarne.length !== 0
              ? <div className="contenedor">
                <h3>Termino de la carne</h3>
                <div className="row"> 
                {referencia.terminosCarne.map(termino =>
                  <Input
                    key={termino}
                    onChange={this.handleChange}
                    type="radio"
                    name="termino"
                    text={referencias.filter(ref => ref.id_referencia === termino)[0].valor}
                    checked={this.state.termino === referencias.filter(ref => ref.id_referencia === termino)[0].valor}
                    className="hover"
                  />)}
                </div>
              </div>
            : null}
            { producto.no_guarniciones !== 0 
              ? <div className="contenedor">
                <h3>Guarnicion(es): {producto.no_guarniciones}</h3>
                <div className="row">
                  {referencia.guarniciones.map((guarnicion, index) =>
                  <Input
                    key={guarnicion}
                    onChange={() => this.handleCheckbox(index)}
                    type="checkbox"
                    name="guarnicion"
                    text={referencias.filter(ref => ref.id_referencia === guarnicion)[0].valor}
                    checked={this.state.guarnicion[index]}
                    className="hover"
                  />)}
                </div>
              </div>
            : null}
            {this.validGuarniciones() > producto.no_guarniciones
            ? <div><span>Por favor no elija más de {producto.no_guarniciones} guarnicion(es)</span><br/><br/></div>
            : <div><br/><br/></div>}
            <span>Notas:</span>
            <Input
              key="nota"
              onChange={this.handleChange}
              type="text"
              name="nota"
              value={this.state.nota}
            />
            <br/>
            <div className="final">
              <Button type="button" onClick={this.rerenderParent} className="secondary">Cancelar</Button>
              { this.validGuarniciones() === producto.no_guarniciones
                ? <Button
                  value="enviar" className="primary">Enviar</Button>
                : <label> Seleccione todas las guarniciones </label>
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Popup