import React, {useContext} from 'react';
import { CartContext } from "../context/cartContext";

const HoverCart = React.memo((props) => {
    const [cart, setCart] = useContext(CartContext);

    return (
        <>
        {props.hoverProp ?  (
            <div className='contenedorCartHover'>
               <>
                {cart.length === 0 ? null :(
                    
                    cart.map(producto=>(
                        <div className='cartHoverItem' key={`cartHoverItem-${producto.id}`}>
                            <div className='cartHoverContenedorImg'>
                                <img className='cartHoverImg' src={producto.imgURL} alt={producto.alt} />
                            </div>
                            <div className='cartHoverContenedorProducto'>
                                <p className='cartHoverProducto'>{producto.nombre}</p>
                                <p className='cartHoverCantidad'>Cantidad: {producto.cantidad}</p>
                            </div>
                        </div>
                    ))
                )}
               </>
            </div>
        ) : null}
        </>
    )
},
(prevProps,nextProps)=>prevProps.hoverProp === nextProps.hoverProp
);


export default HoverCart;
