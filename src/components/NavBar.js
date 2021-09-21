import React, {useEffect,useState} from 'react';
import CartWidget from './CartWidget';
import '../estilos.css';
import Logo from '../assets/img/LogoProvisorio.png';
import {NavLink} from 'react-router-dom';

const NavBar = () =>{
    const [userLog, setUserLog] = useState([])
    useEffect(
        () =>{ 
        const usuarioRegistrado = JSON.parse(localStorage.getItem('registrado'))
            if(usuarioRegistrado){
                setUserLog(usuarioRegistrado);
            }
        },
        []
        );

    return (<header>
        
            <img className='headerLogoImg' src={Logo} alt='Logo '/>
        <div className='headerContenedorLink'>
            <div className='headerLink'>
                <NavLink exact activeClassName='navLinkActivo' to={'/'}>HOME</NavLink>
            </div>
            <div className='headerLink'>
            <NavLink activeClassName='navLinkActivo' to={'/categorias/all'}>CATEGORIAS</NavLink>
            </div>
            <div className='headerLink'>
                <NavLink activeClassName='navLinkActivo' to={'/contacto'}>CONTACTO</NavLink>
            </div>
            <CartWidget />
            <div className='headerLink  headerUser'>
                <NavLink activeClassName='navLinkActivo' to={'/login'}>Login</NavLink>
            </div>
            <div className='headerLink  headerUser'>
                <NavLink activeClassName='navLinkActivo' to={'/registro'}>Registrarse</NavLink>
            </div>
        </div>
    </header>);
}
export default NavBar;