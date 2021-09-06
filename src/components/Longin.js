import React, { useState, useEffect } from 'react';
import { getFirestore } from '../firebase';

const Longin = () => {
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState([]);
    const [contraseña, setContraseña] = useState(null);
    const [buttonDisable, setButtonDisable] = useState(true);
    const db = getFirestore();
    const usuarios = db.collection('user');
    // const batch = db.batch();
    useEffect(()=>{
        usuarios.onSnapshot(snap=>{
            const documents = [];
            snap.forEach(doc=>{
                documents.push({id: doc.id,...doc.data()})
            })
            setUserList(documents)
            console.log(userList);
        })
    },[]);

    

    useEffect(() => {
        if(Object.keys(user).length===4){
            setButtonDisable(false);
        }else{
            setButtonDisable(true);
        }
    }, [user])
    
    const cargarMail = (evento) =>{
        const pMail = document.querySelector('#textoMail');
        if(evento.target.value.includes('@') && evento.target.value.includes('.com')){
            setUser(prevState => ({...prevState, mail:evento.target.value}))
            pMail.style.display='none';
        }else{
            pMail.style.display='block';
            pMail.innerHTML='Debe ingresar un mail existente';
        }
    }
    
    const cargarContraseña = (contra, evento) =>{
        const pContraseñaDos = document.querySelector('#textoContra2');
        if (contra === evento.target.value){
            setUser(prevState => ({...prevState, contraseña:evento.target.value}));
            pContraseñaDos.style.display='none';
        } else {
            pContraseñaDos.style.display='block';
            pContraseñaDos.innerHTML='La contraseña es incorrecta';
            
        }
    }

    const llamarUsuarios = () =>{
        usuarios.onSnapshot(snap => {
            const documents = [];
            snap.forEach(doc=>{
                document.push({id:doc.id,...doc.data()})
            })
            console.log(documents);
        })
    }

    const ChequearUsuario = (usu) =>{
        const usuarioViejo = userList.filter(usuario=> usuario.nombre === usu);
        const pUserName = document.querySelector('#textoUser');
        if(usuarioViejo !== null){
            console.log('todo Pillo');
            pUserName.style.display='none';
            return true;
        }else{ 
            pUserName.style.display='block';
            pUserName.style.display='el nombre de usuario ya existe';
            return false;
        }
    }
    const cargarUsuario = () =>{
        console.log(user.nombre);
        const repetido = ChequearUsuario(user.usuario);
        console.log(repetido);
        if (repetido){
            usuarios.add(user).then((response)=>{
                console.log('usuario Cargado');
            })
        }
    }

    return (
        <div>
            <h2>Registrate:</h2>
            <label for='nombreUser'>Nombre completo:<input type='text' id='nombreUser' name='nombre' placeholder='Ingrese su nombre completo' onChange={(e)=>setUser(prevState => ({...prevState, nombre:e.target.value}))}></input></label><br/>
            <label for='userName'>Usuario:<input type='text' id='userName' name='userName' placeholder='Ingrese su nombre de usuario' onChange={(e)=>setUser(prevState => ({...prevState, usuario:e.target.value}))}></input></label><br/>
            <p className='textoUser' id='textoUser'></p>
            <label for='mailUser'>Mail:<input type='text' id='mailUser' name='mail' placeholder='Ingrese su mail' onChange={(e)=>cargarMail(e)}></input></label><br/>
            <p className='textoUser' id='textoMail'></p>
            <label for='contraseñaUser'>Contraseña:<input minlength="6" type='password' id='contraseñaUser' name='contraseña' placeholder='Ingrese su contraseña' onChange={(e)=>setContraseña(e.target.value)}></input></label><br/>
            <p className='textoUser' id='textoContra1'></p>
            <label for='contraseñaDosUser'>Repetir contraseña:<input minlength="6" type='password' id='contraseñaDosUser' pattern="[A-Za-z0-9]{6,20}" name='contraseñaDos' placeholder='Re-ingrese su contraseña' onChange={(e)=>cargarContraseña(contraseña,e)}></input></label><br/>
            <p className='textoUser' id='textoContra2'></p>
            <button disabled={buttonDisable} onClick={()=>cargarUsuario()}>Cargar</button>
            <button onClick={()=>llamarUsuarios()}>Ver Usuarios</button>
        </div>
    )
}


export default Longin
