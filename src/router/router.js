import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import ListItems from "../components/ListItems";
import Home from '../components/Home';
import Contacto from '../components/Contacto';
import NavBar from '../components/NavBar';
import Cart from '../components/Cart';
import ItemDetail from '../components/ItemDetail';
import Registrarse from '../components/Registrarse';
import Login from '../components/Login';


const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                
                <Route exact path='/' component={Home} />
                <Route path='/categorias/:categoriaId' component={ListItems} />
                <Route path='/productos/:cat/:idRut' component={ItemDetail} />
                <Route path='/contacto' component={Contacto} />
                <Route path='/cart' component={Cart} />
                <Route path='/Login' component={Login} />
                <Route path='/Registro' component={Registrarse} />
                
                
                {/* <Route path='*' component={NotFound} /> */}
                
            </Switch>
        </BrowserRouter>
    )
}

export default Router;