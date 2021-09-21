import React, {useEffect,useState} from "react";
import Loading from './Loading';
import '../estilos.css';
import Item from './Item';
import { NavLink, useParams } from 'react-router-dom';
import db from "../firebase";
import { onSnapshot , collection } from "firebase/firestore";



const ListItems = () => {
  
    const [array, setArray] = useState([]);
    const [arrayItems, setArrayItems] = useState([]);
    

    const [loading, setLoading] = useState(true);
    const {categoriaId} = useParams();


    const cambiarCategoria = (category) => {
        if( category === 'all'){
            setArray(arrayItems);
        }else{
            setArray(arrayItems.filter(producto => producto.categoriaId === category))
        }
    }


    
    useEffect(
        () => 
        onSnapshot(collection(db,'items'),(snapshot)=> {
            setArrayItems(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }),
        []
        );
        useEffect(() => {
            setLoading(true);
        }, [categoriaId])
        
        useEffect(() => {
            cambiarCategoria(categoriaId)
            setTimeout(()=>{
                setLoading(false);
            },3000)
        }, [loading])
 
    return (
        <div className="contenedorCategorias" key='contenedorCategorias'>
            <div className="listadoCategorias">
                <div className="btnCategoria" id='BtnTodos' >
                    <NavLink exact activeClassName='categoriaActiva' to={`/categorias/all`}>Todos los Productos</NavLink>
                </div>
                <div className="btnCategoria" id='BtnBilleteras' >
                    <NavLink activeClassName='categoriaActiva' to='/categorias/42ouXSa8jmBrrL7s7sds'>Billeteras</NavLink>
                </div>
                <div className="btnCategoria" id='BtnCinturones' >
                    <NavLink activeClassName='categoriaActiva' to='/categorias/3xIJwP9hvoSlZAPnVwE9'>Cinturones</NavLink>
                </div>
                <div className="btnCategoria" id='BtnZapatos' >
                    <NavLink activeClassName='categoriaActiva' to='/categorias/Gm8Q9WGItA664lBxirLR'>Zapatos</NavLink>
                </div>
            </div>
            {loading ? <Loading loading={loading} /> : (
                <div className='contenedorItems'>
                    {array.map(a=>(
                        <Item 
                        img={a.imgURL} 
                        alt={a.alt} 
                        precio={a.precio} 
                        nombre={a.nombre} 
                        stock={a.stock} 
                        id={a.id} 
                        categoria={a.categoryName}
                        key={`item-${a.id}`}></Item>
                    ))
                    }
                </div>
                )}

        </div>
    )
    
}

export default ListItems;