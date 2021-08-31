import React, {useEffect,useState} from "react";
import Loading from './Loading';
import '../estilos.css';
import Item from './Item';
// import ItemDetail from './ItemDetail';
import {productos} from '../assets/arrays';
import { NavLink} from 'react-router-dom';
import { getFirestore } from '../firebase';


// let arrayProducto = [];


const ListItems = () => {
    
    const [array, setArray] = useState(productos);
    // const [productoInfo, setProductoInfo] = useState(arrayProducto);


    
    const cargarCategoria = (arrayCategoria) => {
        // let contenedorItemDetalle=document.querySelector('.mainItemDetalle');
        // contenedorItemDetalle.style.display='none';
        const arrayVacio = [];
        setLoading(true);

        const promesa = ()=>
        new Promise ((resolve)=>{
            setArray(arrayVacio);
            setTimeout(()=>{
                resolve(arrayCategoria);
            }, 2000);
        })
        promesa().then((result)=>{
            let contenedorItems=document.querySelector('.contenedorItems');
            contenedorItems.style.display='flex';
            setArray(result);
        })
    }

    
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
    const filtrarArray = (category) => {
        let arrayFiltrado = productos.filter(producto => producto.categoria === category);
        return arrayFiltrado;
     }
     const [loading, setLoading] = useState(true);
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

    const [item, setItem] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection("items");
        // const currentItem = itemCollection.doc(id);

        itemCollection.doc().get()
            // .then((document) => {
            //     if (!document.exists){
            //         console.log('No items');
            //         return;
            //     }
            //     setItem({id: document.id,...document.data()})
            // });
        // getFirestore().collection("items")
                    // .onSnapshot(snap => {
                    //     const documents = [];
                    //     snap.forEach( doc =>{
                    //         documents.push({id:doc.id,...doc.data()})
                    //     });
                    //     setItems(documents);
                    // })
                    .then((data) => {
                        const documents = [];
                        const nuevosItems = data.docs.map((doc)=> (
                            documents.push({ id: doc.id, ...doc.data()})
                            ));
                        setItem(nuevosItems);
                    });
                    // .then((querySnapshot)=>{
                    //     querySnapshot.forEach((doc) =>{
                    //         console.log(doc.id,':',doc.data())
                    //     })
                    // })
                }, [])
    console.log('items: ',item);



    return (
        <div className="contenedorCategorias" key='contenedorCategorias'>
            <div className="listadoCategorias">
                <div className="btnCategoria" id='BtnTodos' onClick={() => cargarCategoria(productos)}>
                    <NavLink exact activeClassName='categoriaActiva' to='/categorias/'>Todos los Productos</NavLink>
                </div>
                <div className="btnCategoria" id='BtnBilleteras' onClick={() => cargarCategoria(filtrarArray('billeteras'))}>
                    <NavLink activeClassName='categoriaActiva' to='/categorias/billeteras'>Billeteras</NavLink>
                </div>
                <div className="btnCategoria" id='BtnCinturones' onClick={() => cargarCategoria(filtrarArray('cinturones'))}>
                    <NavLink activeClassName='categoriaActiva' to='/categorias/cinturones'>Cintrunes</NavLink>
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
                        categoria={a.categoria}
                        funcion={()=>console.log(a.id)}></Item>
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