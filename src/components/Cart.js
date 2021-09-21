import React,{useContext, useEffect, useState} from 'react';
import ItemCarrito from './ItemCarrito';
import Loading from './Loading';
import { CartContext } from "../context/cartContext";
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import db from '../firebase';
import { collection , addDoc } from "firebase/firestore";


const Cart = () => {
    const [cart, setCart] = useContext(CartContext);
    const [orderCreatedId, setOrderCreatedId] = useState(null);
    const [user, setUser] = useState({});
    const [total, setTotal] = useState(0);
    const [compraRealizada, setCompraRealizada] = useState(false)
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
    useEffect(
        () =>{
            const usuarioRegistrado = JSON.parse(localStorage.getItem('registrado'))
            setTimeout(()=>{
                    if(usuarioRegistrado){
                        setUser(usuarioRegistrado);
                    }else{
                        setUser();
                    }
                },1500) 
                console.log('usuarioregistrado',user)
            },
        []
        );

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
                nombre: user.nombre,
                id: user.id,
                mail: user.mail
            },
            items: newItems,
            total
        };
        // console.log('Orden:',nuevaOrden);
        
        const orders = collection(db, 'ordenes');
        const docRef = addDoc(orders,nuevaOrden);
        setCompraRealizada(true);
        setOrderCreatedId(docRef.id)
        
        // orders
        //     .add(nuevaOrden)
        //     .then((response)=>{
        //         // console.log("response", response);
        //         cart.forEach((item ) => {
        //             const docRef = db.collection("items").doc(item.id);
                    
        //             batch.update(docRef, { stock: item.stock - item.cantidad });
        //           });
        //           batch.commit();
        //           setOrderCreatedId(response.id);
        //         })
        //         .catch((error) => console.log(error));  
                
                setCart([]);

    }

    return(
        <>
        {
            loading ? <Loading loading={loading} /> : (

            <div>
                <h3 className='tituloCarrito'>Tu Carrito:</h3>
                <div className='ContenedorCarrito'>
                {compraRealizada && <p className='textoCarrito'> Su pedido fue recibido, N° de orden : {orderCreatedId} </p>}
                {cart.length !==0 && <div className='ItemDetalleBtn ItemDetalleBtn--Volver' onClick={()=>vaciarCart()} >Vaciar Carrito</div>}
                {cart.length===0 && !compraRealizada ? (
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
                    {user&&(
                    <div className='contenedorBtnCart'>
                        <button onClick={()=>enviarCompra()}>Finalizar Compra</button>
                    </div>
                    )}
                    {!user&&(<>
                        <p>Para finalizar la compra debe iniciar sesion</p>
                        <Link className='navLinkContador' to={`/Login`}>
                        <div className='ItemDetalleBtn ItemDetalleBtn--agregar'>iniciar sesion</div>
                        </Link>                        </>
                    )
                    }
                    </>}   
                </div>
            </div>
            )
        }
        </>
    )
}

export default Cart;