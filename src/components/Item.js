import React from 'react';
import {Link} from 'react-router-dom';

const Item = ({img,alt,nombre,precio,stock,id,categoria,funcion})=>{
        return (
            <div className='contenedorItem' id={'tarjetaItem-'+id} key={'tarjetaItem-'+id}>
                <div className='contendorImgItem'>
                    <img className='ItemImg' src={img} alt={alt} />
                </div>
                <p className='Item'>{nombre}</p>
                <p className='ItemPrecio'>$ {precio}</p>
                <p className='ItemStock'>Stock: {stock} </p>
                <div className='ItemBtn' id={`ItemBtn-${id}`} onClick={funcion}><Link to={`/productos/${categoria}/${id}`}>Ver Producto</Link></div>
               
            </div>
        );
    } 

export default Item;