import React, {useEffect,useState} from "react";
import Loading from './Loading';
import '../estilos.css';
import Item from './Item';
// import ItemDetail from './ItemDetail';
// import {productos} from '../assets/arrays';
import { NavLink, useParams } from 'react-router-dom';
// import { getFirestore } from '../firebase';
import { useData } from "../hooks/useData";


// let arrayProducto = [];


const ListItems = () => {

   
    
    // const [productoInfo, setProductoInfo] = useState(arrayProducto);
    
    
    const firebaseArray = useData('items');
    const arrayItems = firebaseArray.item;
    
    const arrayCategoria = useData('categorias');
    const idCategoria = arrayCategoria.item;
    
    const [array, setArray] = useState([]);
    const [url, setUrl] = useState('');    


    const urlCategoria = (category) => {
        if( category === ''){
            setUrl('');
        }else{
            const categoriaElegida = idCategoria.filter(link => link.nombre === category);
            setUrl(categoriaElegida[0].id);
        }
    }

    const cambiarCategoria = (category) => {
        
        if( category === ''){
            setArray(arrayItems);
        }else{
            setArray(arrayItems.filter(producto => producto.categoryName === category))
        }
        setLoading(true);
        urlCategoria(category);
    }
    // useEffect(() => {
    //     cambiarCategoria('');
    // }, [])
    // const cargarCategoria = (arrayCategoria) => {
    //     // let contenedorItemDetalle=document.querySelector('.mainItemDetalle');
    //     // contenedorItemDetalle.style.display='none';
    //     const arrayVacio = [];
    //     setLoading(true);

    //     const promesa = ()=>
    //     new Promise ((resolve)=>{
    //         setArray(arrayVacio);
    //         setTimeout(()=>{
    //             resolve(arrayCategoria);
    //         }, 2000);
    //     })
    //     promesa().then((result)=>{
    //         let contenedorItems=document.querySelector('.contenedorItems');
    //         contenedorItems.style.display='flex';
    //         setArray(result);
    //     })
    // }

    
    // const abrirDetalleProducto = (id) =>{
    //     arrayProducto = [];
    //     arrayProducto.push(productos[`${id-1}`]);
    //     let contenedorItems=document.querySelector('.contenedorItems');
    //     console.log(contenedorItems);
    //     contenedorItems.style.display='none';
    //     setLoading(true);
    //     const arrayVacio = [];       
    //     const promesa = ()=>
    //     new Promise ((resolve)=>{
    //         setProductoInfo(arrayVacio);
    //         setTimeout(()=>{
    //             resolve(arrayProducto);
    //         }, 3000);
    //     })
    //     promesa().then((result)=>{
    //         // let contenedorItemDetalle=document.querySelector('.mainItemDetalle');
    //         // contenedorItemDetalle.style.display='block';

    //         setProductoInfo(result)
    //     })
    // }
    // const cerrarItem = () => {
    //     // let contenedorItemDetalle=document.querySelector('.mainItemDetalle');
    //     let contenedorItems=document.querySelector('.contenedorItems');
    //     // contenedorItemDetalle.style.display='none';
    //     setLoading(true);
    //     setTimeout(()=>{
    //         contenedorItems.style.display='flex';
    //     }, 2000);
    // }
    // const filtrarArray = (category) => {
    //     let arrayFiltrado = productos.filter(producto => producto.categoria === category);
    //     return arrayFiltrado;
    //  }
     const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },3000)
    }, [loading])


    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },3000)
    }, [loading])
    //  const reiniciarLoading = () =>{
    //      setLoading(true);
    //      setTimeout(()=>{
    //         setLoading(false);
    //     },3000)
    // }
     
    //FIREBASE

    // const [item, setItem] = useState([]);

    // const cambiarCategoria = () => {

    // }
    // useEffect(() => {
    //     getFirestore().collection('items')
    //                     // .get()
    //                     // .then((data) => {
    //                     //     const nuevosItems = data.docs.map((doc)=> doc.data());
    //                     //     setItem(nuevosItems);
    //                     // });
    //                     .onSnapshot(snap => {
    //                         const documents = [];
    //                         snap.forEach(doc => {
    //                             documents.push({id: doc.id,...doc.data()})
    //                         })
    //                         setItem(documents)
    //                     })
    //                 }, [])


    return (
        <div className="contenedorCategorias" key='contenedorCategorias'>
            <div className="listadoCategorias">
                <div className="btnCategoria" id='BtnTodos' onClick={() => cambiarCategoria('')}>
                    <NavLink exact activeClassName='categoriaActiva' to={`/categorias/`}>Todos los Productos</NavLink>
                </div>
                <div className="btnCategoria" id='BtnBilleteras' onClick={() => cambiarCategoria('billeteras')}>
                    <NavLink activeClassName='categoriaActiva' to='/categorias/42ouXSa8jmBrrL7s7sds'>Billeteras</NavLink>
                </div>
                <div className="btnCategoria" id='BtnCinturones' onClick={() => cambiarCategoria('cinturones')}>
                    <NavLink activeClassName='categoriaActiva' to='/categorias/3xIJwP9hvoSlZAPnVwE9'>Cinturones</NavLink>
                </div>
                <div className="btnCategoria" id='BtnZapatos' onClick={() => cambiarCategoria('zapatos')}>
                    <NavLink activeClassName='categoriaActiva' to='/categorias/Gm8Q9WGItA664lBxirLR'>Zapatos</NavLink>
                </div>
            </div>
            {loading ? <Loading loading={loading} /> : (
                <>
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
                {/* <div className='mainItemDetalle'>
                        {productoInfo.map(produ=>(
                            <ItemDetail
                            img={produ.imgURL}
                            alt={produ.alt}
                            nombre={produ.nombre}
                            precio={produ.precio}
                            id={produ.id}
                            info={produ.informacion}
                            funcion={()=>cerrarItem()}
                            ></ItemDetail>
                            ))}
                </div> */}
                </>
                )}

        </div>
    )
    
}

export default ListItems;