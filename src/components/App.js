import React from "react";
import { CartProvider } from "../context/cartContext";
import Router from "../router/router";


const App =()=>{
    
    return (
        <>
        <div>
            <CartProvider>
                <Router />
            </CartProvider>
        </div>
        </>
    )
    
}

export default App;
