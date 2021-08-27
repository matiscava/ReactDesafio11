import React, {useEffect,useState} from "react";
import Loading from './Loading';

const Contacto = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },3000)
    }, [])
    return(
        <>
        {
            loading ? <Loading loading={loading} /> : (

        <div>
            <h1>Pagina en construcción</h1>
        </div>
            )}
        </>
    )
}

export default Contacto;