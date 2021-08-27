import React, {useEffect,useState} from "react";
import Loading from './Loading';


const Home = () => {
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
            <h1>Hola</h1>
        </div>
         )}
         </>
    )
}

export default Home;