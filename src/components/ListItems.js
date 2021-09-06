import React, {useEffect,useState} from "react";
import Loading from './Loading';
import '../estilos.css';
import Item from './Item';
import { NavLink, useParams } from 'react-router-dom';
import { useData } from "../hooks/useData";



const ListItems = () => {

    
    const firebaseArray = useData('items');
    const arrayItems = firebaseArray.item;
    
    // const arrayCategoria = useData('categorias');
    // const idCategoria = arrayCategoria.item;
    
    const [array, setArray] = useState(arrayItems);
    // const [url, setUrl] = useState('');    

    const [loading, setLoading] = useState(true);
    const {categoriaId} = useParams();


    const cambiarCategoria = (category) => {
        if( category === 'all'){
            console.log('array',arrayItems);
            setArray(arrayItems);
        }else{
            setArray(arrayItems.filter(producto => producto.categoriaId === category))
        }
        // setLoading(true);
    }

    useEffect(() => {
        setTimeout(()=>{
            cambiarCategoria(categoriaId)
            setLoading(false);
        },2000)
    }, [loading])

    useEffect(() => {
        setLoading(true);
    }, [categoriaId])

    // useEffect(() => {
    //     console.log('array',array);
    //     if( categoriaId === 'all'){
    //         console.log('array',arrayItems);
    //         setArray(arrayItems);
    //     }else{
    //         setArray(arrayItems.filter(producto => producto.categoriaId === category))
    //     }
    // }, [array])


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
                        funcion={()=>console.log(a.id)}
                        key={`item-${a.id}`}></Item>
                    ))
                    }
                </div>
                )}

        </div>
    )
    
}

export default ListItems;