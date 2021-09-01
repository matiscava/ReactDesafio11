import React,{useContext,useState} from 'react';
import '../estilos.css';
import '../Iconos3/style.css';
import {NavLink} from 'react-router-dom';
import {CartContext} from '../context/cartContext';
import HoverCart from './HoverCart';



const CartWidget = () => { 
    // let navBarSpan = document.querySelector('.headerContenedorSpan');
    const [hoverProp, setHoverProp] = useState(false)

    const cambiarHover = (boolean) => {
        setTimeout(()=>{
            setHoverProp(boolean);
        }, 300)
    }
    const [cart, setCart] = useContext(CartContext);

    const cantidadCarrito = cart.reduce((total,b)=> total + b.cantidad, 0);

    return(
        <>
            <div className='headerContenedorSpan' onMouseOver={() => cambiarHover(true)} onMouseOut={() => cambiarHover(false)}>
                <NavLink activeClassName='navLinkActivo' to={'/cart'}>
                    <span className='NavBarSpan IconoSocial-shopping-cart'></span>
                    {cart.length !== 0 && <span className='spanItemCarrito'>{cantidadCarrito}</span>} 
                </NavLink>
                <HoverCart hoverProp={hoverProp} key='itemCarritoHover'/>
            </div> 
        </>
    )
}

export default CartWidget;

