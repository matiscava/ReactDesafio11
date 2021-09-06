import React,{useState, useContext} from "react";
// import {productos} from '../assets/arrays';
import {Link} from 'react-router-dom';
import { CartContext } from "../context/cartContext";
import { useData } from '../hooks/useData';


let ArrayCarrito = [];
let carritoCargado = localStorage.getItem('productosCarrito');
if(carritoCargado!=null){
    ArrayCarrito.push(JSON.parse(carritoCargado))
}
let apretado=false;



const ItemCount = ({id,stock}) => {
       
    // let productoContado = productos.find( producto => producto.id === id);
    
    const firebaseArray = useData('items');
    const arrayItems = firebaseArray.item;

    const itemElegido = arrayItems.find(producto => producto.id === id);
    console.log(itemElegido);

    const [numero, setNumero] = useState(1);
    const [nuevoStock,setNuevoStock]= useState(stock);

    const sumarUno = () =>{
            if(numero<nuevoStock){
                setNumero(numero+1);    
            }
        }
    const restarUno = ()=>{
            if(numero>0){
                setNumero(numero-1);
            }
    }

    const cambiarStock = (contador) =>{
        setNuevoStock(nuevoStock-contador);
        if(nuevoStock-contador ===0){
            setNumero(0);
        }else{
            setNumero(1);
        }
    }
    const [cart, setCart] = useContext(CartContext);
    const repetido = () =>{
        let buscador = cart.find( producto => producto.id === id );
        if(buscador!==undefined){
            let cantidad = buscador.cantidad;
            borrarItem(buscador.id)
            addToCart(numero+cantidad);
        }else{
            addToCart(numero);
        }
        cambiarStock(numero);
        apretado=true;
    }
    const borrarItem = (id) =>{
        const arrayNuevo = cart.filter((producto) => producto.id !== id);
        setCart(arrayNuevo);
    }
    const addToCart = (contador)=>{
        const item = {
            id: id,
            nombre: itemElegido.nombre,
            precio: itemElegido.precio,
            imgURL: itemElegido.imgURL,
            alt: itemElegido.alt,
            informacion: itemElegido.informacion,
            cantidad: contador,
            categoria: itemElegido.categoria,
            marca: itemElegido.marca,
            modelo: itemElegido.modelo,
            stock: itemElegido.stock
        }
        setCart(carrito => [...carrito, item]);
    }
    return (
        <div className='contendorContadorItem'>
            <div className='contenedorNumero'>
                <p className='numeroItem'>{numero}</p>
                <div className='contendorSpan'>
                    <span className='spanStock IconoSocial-plus'onClick={()=>sumarUno()}></span>
                    <span className='spanStock IconoSocial-minus' onClick={()=>restarUno()}></span>
                </div>
            </div>
            <p className='numeroStock'>Stock: {nuevoStock}</p>
            <div className='ItemDetalleBtn ItemDetalleBtn--agregar' onClick={()=>repetido()}> Agregar al carrito</div>
            {apretado && <Link to='/cart' className='navLinkContador'><div className='ItemDetalleBtn' onClick={apretado=false} href='/cart'>Continuar con la compra</div></Link>}
        </div>
    );
     
}

export default ItemCount;