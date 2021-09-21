import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import ContadorItem from './ContadorItem';
import Loading from './Loading';
import db from "../firebase";
import { onSnapshot , collection } from "firebase/firestore";

const ItemDetail = ()=>{
    const {idRut} = useParams();

    const [arrayItems, setArrayItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },3000)
    }, [])
    useEffect(
        () => 
        onSnapshot(collection(db,'items'),(snapshot)=> {
            setArrayItems(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        }),
        []
        );
   
    
    const itemElegido = arrayItems.find(producto => producto.id === idRut);

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
