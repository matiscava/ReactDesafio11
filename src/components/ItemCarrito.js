import React,{useContext} from 'react';
import { CartContext } from '../context/cartContext';

const ItemCarrito = ({img,alt,nombre,precio,cantidad,id,categoria})=>{
    const [cart, setCart] = useContext(CartContext);
    const borrarItem = (id) =>{
        const arrayNuevo = cart.filter((producto) => producto.id !== id);
        setCart(arrayNuevo);
    }
    return (
        <div className='contenedorItemCarrito' id={'tarjetaItemCarrito-'+id} key={'tarjetaItemCarrito-'+id}>
            <div className='contendorImgItemCarrito'>
                <img className='ItemCarritoImg' src={img} alt={alt} />
            </div>
            <div className='contendorItemCarritoInformacion'>
                <div className='contendorItemCarritoTexto'>
                    <p className='ItemCarrito'>{nombre}</p>
                    <p className='ItemCarritoCategoria'>{categoria}</p>
                    <p className='ItemCarritoCantidad'>Cantidad: {cantidad} </p>
                    <p className='ItemCarritoPrecio'>Precio por Unidad: $ {precio}</p>
                    <p className='ItemCarritoPrecio ItemCarritoPrecio-Total'>Total: $ {precio*cantidad}</p>
                </div>
                <div className='contenedorItemCarritoEditores'>
                    {/* <p className= 'itemCarritoEditor'>Sumar Uno</p>
                    <p className= 'itemCarritoEditor'>Restar Uno</p> */}
                    <p className= 'itemCarritoEditor' onClick={()=>borrarItem(id)}>Quitar Producto</p>
                </div>
            </div>
        </div>
    );
    } 

export default ItemCarrito;