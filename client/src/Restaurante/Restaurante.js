import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Menu from './components/Menu'

const Restaurante = () => {
  const [productos, setProductos] = useState([])
  const [productosTotal, setProductosTotal] = useState([])
  const [guarnicionesExtra, setGuarnicionesExtra] = useState([])
  const [bebidas, setBebidas] = useState([])
  const [postres, setPostres] = useState([])
  const [referencias, setReferencias] = useState([])
  const [referenciasMenu, setReferenciasMenu] = useState([])
  const [tiposPlato, setTiposPlato] = useState([])
  const [carro, setCarro] = useState([])
  const [esCarroVisible, setEsCarroVisible] = useState(false)
  const [productoNumero, setProductoNumero] = useState(0)

  useEffect(() => {
    // Simulando obtener los datos que antes obtenías de Axios
    getTipoPlatos()
    getPlatos()
    getReferencias()
    getReferenciasMenu()
  }, [])

  const getPlatos = () => {
    // Aquí puedes reemplazar por tus datos estáticos
    const platos = [
      { id_plato: 1, tipo_plato: 1, name: "Entrellano", img: "productos/1.jpg" },
      { id_plato: 2, tipo_plato: 2, name: "Papas Fritas", img: "productos/2.jpg" },
      // Agrega más datos de prueba
    ]
    
    let productos = []
    let guarnicionesExtra = []
    let bebidas = []
    let postres = []

    platos.map(producto => {
      switch (producto.tipo_plato) {
        case 1:
          productos.push(producto)
          break
        case 2:
          guarnicionesExtra.push(producto)
          break
        case 3:
          bebidas.push(producto)
          break
        case 4:
          postres.push(producto)
          break
        default:
          break
      }
      return producto
    })

    setGuarnicionesExtra(guarnicionesExtra)
    setBebidas(bebidas)
    setPostres(postres)
    setProductos(productos)
    setProductosTotal(platos)
  }

  const getReferencias = () => {
    // Datos simulados de referencias
    const referencias = [
      { id_referencia: 1, descripcion: "Picaña" },
      { id_referencia: 2, descripcion: "Ensalada" },
      // Agrega más datos de prueba
    ]
    setReferencias(referencias)
  }

  const getTipoPlatos = () => {
    // Datos simulados de tipos de platos
    const tipos = ["Plato Fuerte", "Acompañante", "Bebida", "Postre"]
    setTiposPlato(tipos)
  }

  const getReferenciasMenu = () => {
    const referenciasMenu = [
      { id_plato: 1, guarniciones: [1], terminosCarne: [] },
      { id_plato: 2, guarniciones: [], terminosCarne: [2] },
      // Más datos de prueba
    ]
    setReferenciasMenu(referenciasMenu)
  }

  const addToCart = (producto, data) => {
    setProductoNumero(prev => prev + 1)
    const obj = {
      numero: productoNumero,
      name: producto.name,
      img: producto.img,
    }

    let guarniciones = []
    let newData = []

    data.forEach(element => {
      if (element[1]) {
        if (element[0] === "guarnicion") {
          guarniciones = guarniciones.concat(element[1])
        } else {
          newData.push(element)
        }
      }
    })

    if (guarniciones.length) {
      newData.push(["guarniciones", guarniciones])
    }

    setCarro(prevCarro => [
      ...prevCarro,
      { ...obj, newData },
    ])
  }

  const removeFromCart = (item) => {
    setCarro(prevCarro => prevCarro.filter(data => data !== item))
  }

  const showCart = () => {
    if (!carro.length) {
      setEsCarroVisible(false)
      return
    }
    setEsCarroVisible(!esCarroVisible)
  }

  return (
    <div style={{ backgroundColor: "white" }} width="100%">
      <Navbar
        carro={carro}
        esCarroVisible={esCarroVisible}
        showCart={showCart}
        removeFromCart={removeFromCart}
      />
      <Layout>
        <Menu 
          addToCart={addToCart}
          productos={productos}
          guarniciones={guarnicionesExtra}
          bebidas={bebidas}
          postres={postres}
          carro={carro}
          referencias={referencias}
          referenciasMenu={referenciasMenu}
          tiposPlato={tiposPlato}
        />
      </Layout>
    </div>
  )
}

export default Restaurante
