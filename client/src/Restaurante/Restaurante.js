import React, { Component } from 'react';
import Axios from 'axios'
import Layout from './components/Layout'
import Navbar from './components/Navbar';
import Menu from './components/Menu';

class Restarurante extends Component {

  state = { 
    productos: [],
    productosTotal: [],
    guarnicionesExtra: [],
    bebidas: [],
    postres: [],
    referencias: [],
    referenciasMenu: [],
    tiposPlato: [],
    carro: [],
    esCarroVisible: false,
    productoNumero: 0
  }

  
  componentDidMount(){
    this.getTipoPlatos()
    this.getPlatos()
    this.getReferencias()
    this.getReferenciasMenu()
    this.forceUpdate()
  }

  shouldComponentUpdate(nextProps, nextState){
    return true
  }

  getPlatos = () => {
    const obj = {
      firstName: "Fred",
      lastName: "flintstone"
    }
    Axios.post("http://localhost:5000/api/json", obj)
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    Axios.get("http://localhost:5000/api/platos").then(response => {
      var productos = []
      var guarnicionesExtra = []
      var bebidas = []
      var postres = []
      const total = response.data.map(producto => {
        producto.img = `productos/${producto.id_plato}.jpg`
        switch(producto.tipo_plato){
          case this.state.tiposPlato[0]:
            productos.push(producto)
            break
          
          case this.state.tiposPlato[1]:
            guarnicionesExtra.push(producto)
            break
          
          case this.state.tiposPlato[2]:
            bebidas.push(producto)
            break

          case this.state.tiposPlato[3]:
            postres.push(producto)
            break

          default:
            break
        }
        return producto
        })
      this.setState({guarnicionesExtra: guarnicionesExtra})
      this.setState({bebidas: bebidas})
      this.setState({postres: postres})
      this.setState({productos: productos})
      this.setState({productosTotal: total})
    })
  }

  getReferencias = () => {
    Axios.get("http://localhost:5000/api/referencias").then(response => {
      this.setState({referencias: response.data})
    })
  }

  getTipoPlatos = () => {
    Axios.get("http://localhost:5000/api/tiposMenu").then(response => {
      const tipos = response.data.map(tipo => {return tipo.descripcion})
      this.setState({tiposPlato: tipos})
    })
  }

  getReferenciasMenu = () => {
    var temp = []
    var referencias = []
    Axios.get("http://localhost:5000/api/referenciasMenu").then(response => {
      response.data.map(referencia => {
        if(!temp.includes(JSON.stringify({id_plato: referencia.id_plato}))){
          temp.push(JSON.stringify({id_plato: referencia.id_plato}))
          if(referencia.id_ref_desc === "GUARNICION"){
            referencias.push(
              {id_plato: referencia.id_plato,
               guarniciones: [referencia.id_referencia],
               terminosCarne: []})
          }else if(referencia.id_ref_desc === "TERMINO_CARNE"){
            referencias.push(
              {id_plato: referencia.id_plato,
               guarniciones: [],
               terminosCarne: [referencia.id_referencia]})
          }
        }else{
          const index = referencias.findIndex(e => e.id_plato === referencia.id_plato)
          if(referencia.id_ref_desc === "GUARNICION"){
            referencias[index].guarniciones = referencias[index].guarniciones.concat(referencia.id_referencia)
          }else if(referencia.id_ref_desc === "TERMINO_CARNE"){
            referencias[index].terminosCarne = referencias[index].terminosCarne.concat(referencia.id_referencia)
          }
        }
        return null
      })
      this.setState({referenciasMenu: referencias})
    })
  }

  // Funcion que va agregando los productos al carrito de compras
  addToCart = (producto, data) => {
    this.setState({productoNumero: this.state.productoNumero+1})
    var obj = {
      numero: this.state.productoNumero,
      name: producto.name,
      img: producto.img,
    }

    var guarniciones = []
    var newData = []
    data.forEach(element => {
      if(element[1]){
        if(element[0] === "guarnicion"){
          guarniciones = guarniciones.concat(element[1])
        }else{
          newData.push(element)
        }
      }
    })

    if (guarniciones.length){
      newData.push(["guarniciones", guarniciones])
    }

    const arrayFinal = [obj, newData]

    return this.setState({
      carro: this.state.carro.concat({
        ...arrayFinal,
      })
    })
  }

  removeFromCart = (item) =>{
    return this.setState({carro: this.state.carro.filter(data => data !== item)})
  }

  // función para mostrar u ocultar el carrito de compras actual
  showCart = () => {
    if(!this.state.carro.length){
      this.setState({esCarroVisible: false})
      return
    }
    this.setState({esCarroVisible: !this.state.esCarroVisible})
  }

  // La función que renderiza los objetos en pantalla
  render(){
    const {esCarroVisible} = this.state //variable que dice si el carrito de compras se ve o no se ve
    return(
      <div style={{ backgroundColor: "white"}} width="100%">
        {/* La barra de navegación en la parte más arriba de la pantalla */}
        <Navbar
          carro={this.state.carro}
          esCarroVisible={esCarroVisible}
          showCart={this.showCart}
          removeFromCart={this.removeFromCart}
        />
        {/* Toda la parte de abajo de la página */}
        <Layout>
          <Menu 
            addToCart = {this.addToCart}
            productos = {this.state.productos}
            guarniciones = {this.state.guarnicionesExtra}
            bebidas = {this.state.bebidas}
            postres = {this.state.postres}
            carro = {this.state.carro}
            referencias = {this.state.referencias}
            referenciasMenu = {this.state.referenciasMenu}
            tiposPlato = {this.state.tiposPlato}
          />
        </Layout>
      </div>
    )
  }
}

export default Restarurante;