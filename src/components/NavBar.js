import React from 'react';
import CartWidget from './CartWidget';
import '../estilos.css';
import Logo from '../assets/img/LogoProvisorio.png';
import {NavLink} from 'react-router-dom';

const NavBar = () =>{

    return (<header>
        
            <img className='headerLogoImg' src={Logo} alt='Logo '/>
        <div className='headerContenedorLink'>
            <div className='headerLink'>
                <NavLink exact activeClassName='navLinkActivo' to={'/'}>HOME</NavLink>
            </div>
            <div className='headerLink'>
            <NavLink activeClassName='navLinkActivo' to={'/categorias'}>CATEGORIAS</NavLink>
            </div>
            <div className='headerLink'>
                <NavLink activeClassName='navLinkActivo' to={'/contacto'}>CONTACTO</NavLink>
            </div>
            <CartWidget />
        </div>
    </header>);
}
export default NavBar;