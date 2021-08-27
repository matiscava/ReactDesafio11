import React from 'react';
import imgLoading from '../assets/img/pngwing.com.png';


const Loading = ({loading}) => {
    return (loading? (
        <div className='contenedorCargando'>
            <img className='imgCargando' src={imgLoading} alt='logo cargando' />
            <h3 className='textoCargando'>Cargando...</h3>
        </div>
    ): null)
}

export default Loading
