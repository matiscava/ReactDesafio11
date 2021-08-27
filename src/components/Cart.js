import React,{useContext, useEffect, useState} from 'react';
import ItemCarrito from './ItemCarrito';
import Loading from './Loading';
import { CartContext } from "../context/cartContext";
import {Link} from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useContext(CartContext);
    const vaciarCart = () => {
        setCart([]);
    
    }
    const PrecioCarritoCarrito = () => {
        let precioInicial = 0;
        for (let i=0; i< cart.length;i++){
            precioInicial += cart[i].cantidad * cart[i].precio; 
        }
        return precioInicial;
    }
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },3000)
    }, [])

    return(
        <>
        {
            loading ? <Loading loading={loading} /> : (

            <div>
                <h3 className='tituloCarrito'>Tu Carrito:</h3>
                <div className='ContenedorCarrito'>
                {cart.length !==0 && <div className='ItemDetalleBtn ItemDetalleBtn--Volver' onClick={()=>vaciarCart()} >Vaciar Carrito</div>}
                {cart.length===0 ? (
                    <>
                        <p className='textoCarrito'>El Carrito está vacio, presioná el boton para 'ir a colecciones' para ver nuestros productos...</p>
                        <Link to='/categorias' className='navLinkContador navLinkContador--Carrito'>
                            <div className='ItemDetalleBtn'>Ir a Colecciones</div>
                        </Link>
                    </>
                ) : 
                cart.map(producto=>(
                    <ItemCarrito 
                        img={producto.imgURL}
                        alt={producto.alt}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        cantidad={producto.cantidad}
                        id={producto.id}
                        categoria={producto.categoria}
                    />
                ))
                } 
                {cart.length!==0 && <div className='contenedorTotal'>
                    <h3 className='totalPagar'>Total a pagar: ${PrecioCarritoCarrito()}</h3></div>
                    }   
                </div>
            </div>
            )
        }
        </>
    )
}

export default Cart;