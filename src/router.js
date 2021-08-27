import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import ListItems from "../components/ListItems";
import Home from '../components/Home';
import Contacto from '../components/Contacto';
import NavBar from '../components/NavBar';



const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                {/* <Route path='/home'>
                    <Home />
                </Route> 
                 o ... */}
                <Route exact path='/' component={Home} />
                <Route path='/categorias' component={ListItems} />
                <Route path='/contacto' component={Contacto} />
                {/* <Route path='*' component={NotFound} /> */}
                
            </Switch>
        </BrowserRouter>
    )
}

export default Router;