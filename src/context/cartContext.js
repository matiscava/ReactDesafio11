import {createContext, useState} from 'react';
import { getFirestore } from "../firebase";


export const CartContext = createContext();

export const CartProvider = (props) => {
    const [cart,setCart] = useState([]);
    const [productos,setProductos] = useState([]);

    const db = getFirestore();
    
    const firebaseArray = db.collection('items');
    firebaseArray.get().then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          console.log("No items");
        }
        setProductos(
          querySnapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }))
        );
      })
      .catch((error) => console.log(error));
    // const arrayItems = firebaseArray.item;

    return(
        <CartContext.Provider value={[cart,setCart]} productos={[productos,setProductos]}>
            {props.children}
        </CartContext.Provider>
    )
}