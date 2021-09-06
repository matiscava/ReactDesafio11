import React,{useContext, useEffect, useState} from 'react';
import ItemCarrito from './ItemCarrito';
import Loading from './Loading';
import { CartContext } from "../context/cartContext";
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { getFirestore } from '../firebase';

const Cart = () => {
    const [cart, setCart] = useContext(CartContext);
    const [orderCreatedId, setOrderCreatedId] = useState(null);

    const [total, setTotal] = useState(0);
    const vaciarCart = () => {
        setCart([]);
    
    }
    useEffect(() => {
        let precioInicial = 0;
        for (let i=0; i< cart.length;i++){
            precioInicial += cart[i].cantidad * cart[i].precio; 
        }
        setTotal(precioInicial);
    }, [cart])
    // const PrecioCarritoCarrito = () => {
    //     let precioInicial = 0;
    //     for (let i=0; i< cart.length;i++){
    //         precioInicial += cart[i].cantidad * cart[i].precio; 
    //     }
    //     return precioInicial;
    // }
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },3000)
    }, [])

    //BTN ENVIAR COMPRA
    const compraRealizado = false;

    const enviarCompra = () => {
        const newItems = cart.map(item=>({
            item: {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: item.cantidad
            }
        }))
        const nuevaOrden = {
            cliente: {
                nombre: 'matias',
                telefono: '45442793',
                email: 'matinico11@hotmail.com'
            },
            items: newItems,
            total
        };
        // console.log('Orden:',nuevaOrden);
        const db = getFirestore();
        const orders = db.collection('ordenes');
        const batch = db.batch();

        orders
            .add(nuevaOrden)
            .then((response)=>{
                // console.log("response", response);
                cart.forEach((item ) => {
                    const docRef = db.collection("items").doc(item.id);
                    
                    batch.update(docRef, { stock: item.stock - item.cantidad });
                  });
                  batch.commit();
                  setOrderCreatedId(response.id);
                })
                .catch((error) => console.log(error));  
                
                setCart([]);

    }

    return(
        <>
        {
            loading ? <Loading loading={loading} /> : (

            <div>
                <h3 className='tituloCarrito'>Tu Carrito:</h3>
                <div className='ContenedorCarrito'>
                {compraRealizado && <p className='textoCarrito'> Su pedido fue recibido, N° de orden : {orderCreatedId} </p>}
                {cart.length !==0 && <div className='ItemDetalleBtn ItemDetalleBtn--Volver' onClick={()=>vaciarCart()} >Vaciar Carrito</div>}
                {cart.length===0 && !compraRealizado ? (
                    <>
                        <p className='textoCarrito'>El Carrito está vacio, presioná el boton para 'ir a colecciones' para ver nuestros productos...</p>
                        <Link to='/categorias/all' className='navLinkContador navLinkContador--Carrito'>
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
                        key={producto.id}
                        categoria={producto.categoria}
                    />
                ))
                } 
                {cart.length!==0 && <>
                    <div className='contenedorTotal'>
                        <h3 className='totalPagar'>Total a pagar:{' '}<NumberFormat
        thousandsGroupStyle="thousand"
        value={total}
        prefix="$"
        decimalSeparator="."
        displayType="text"
        type="text"
        thousandSeparator={true}
        decimalScale={2}
        fixedDecimalScale={true}
         /></h3>
                    </div>
                    <div className='contenedorBtnCart'>
                        <button onClick={()=>enviarCompra()}>Finalizar Compra</button>
                    </div>
                    </>}   
                </div>
            </div>
            )
        }
        </>
    )
}

export default Cart;