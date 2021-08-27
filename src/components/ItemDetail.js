import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import ContadorItem from './ContadorItem';
import {productos} from '../assets/arrays';
import Loading from './Loading';


const ItemDetail = ()=>{
    const {idRut} = useParams();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },3000)
    }, [])

   
    let productoDetalle = productos.find( producto => producto.id === parseInt(idRut));
    const {imgURL,alt,nombre,precio,id,informacion,categoria} = productoDetalle;

    return (
        <>
        {loading ? <Loading loading={loading} /> : (

        <div className='contenedorItemDetalle' id={`contenedorItemDetalle-${id}`} key={`contenedorItemDetalle-${id}`}>
                <div className='contendorImgItemDetalle'>
                    <img className='ItemDetalleImg' src={imgURL} alt={alt} />
                </div>
                <div className='contendorInfoItemDetalle'>
                    <p className='ItemDetalle'>{nombre}</p>
                    <p className='ItemDetallePrecio'>Valor: $ {precio}</p>
                    <p className='ItemDetalleInfo'>{informacion}</p>
                    <ContadorItem 
                        id={id}
                    />
                    <div className='ItemDetalleContenedorBtn'>
                        <Link className='navLinkContador' to={`/categorias`}>
                            <div className='ItemDetalleBtn ItemDetalleBtn--Volver' id={`ItemDetalleBtnVolver-${id}`}>Volver a Colecciones</div>
                        </Link>
                    </div>
                </div>
            </div>
    )}
    </>
    )
}

export default ItemDetail;
