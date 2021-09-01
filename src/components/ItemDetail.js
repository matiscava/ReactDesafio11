import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import ContadorItem from './ContadorItem';
// import {productos} from '../assets/arrays';
import Loading from './Loading';
import { useData } from '../hooks/useData';


const ItemDetail = ()=>{
    const {idRut} = useParams();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },3000)
    }, [])
    const firebaseArray = useData('items');
    const arrayItems = firebaseArray.item;
    
    const itemElegido = arrayItems.find(producto => producto.id === idRut);

    // let productoDetalle = productos.find( producto => producto.id === parseInt(idRut));
    // const {img,alt,nombre,precio,id,informacion} = productoDetalle;

    return (
        <>
        {loading ? <Loading loading={loading} /> : (

        <div className='contenedorItemDetalle' id={`contenedorItemDetalle-${itemElegido.id}`} key={`contenedorItemDetalle-${itemElegido.id}`}>
                <div className='contendorImgItemDetalle'>
                    <img className='ItemDetalleImg' src={itemElegido.imgURL} alt={itemElegido.alt} />
                </div>
                <div className='contendorInfoItemDetalle'>
                    <p className='ItemDetalle'>{itemElegido.nombre}</p>
                    <p className='ItemDetallePrecio'>Valor: $ {itemElegido.precio}</p>
                    <p className='ItemDetalleInfo'>{itemElegido.informacion}</p>
                    <ContadorItem 
                        id={itemElegido.id}
                        stock={itemElegido.stock}
                    />
                    <div className='ItemDetalleContenedorBtn'>
                        <Link className='navLinkContador' to={`${itemElegido.categoryId}`}>
                            <div className='ItemDetalleBtn ItemDetalleBtn--Volver' id={`ItemDetalleBtnVolver-${itemElegido.id}`}>Volver a Colecciones</div>
                        </Link>
                    </div>
                </div>
            </div>
    )}
    </>
    )
}

export default ItemDetail;
