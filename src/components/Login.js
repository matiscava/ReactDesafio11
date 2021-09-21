import React, { useState, useEffect } from 'react';
import db from "../firebase";
import { onSnapshot , collection } from "firebase/firestore";

const Login = () => {
    const [userList, setUserList] = useState([]);
    const [userLog, setUserLog] = useState({});
    const [registro, setRegistro] = useState(false)

    useEffect(
        () =>{ 
            onSnapshot(collection(db,'usuarios'),(snapshot)=> {
                setUserList(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})));
            })
    }, [])

    useEffect(
        () =>{ 
        const usuarioRegistrado = JSON.parse(localStorage.getItem('registrado'))
            if(usuarioRegistrado){
                setRegistro(true);
                setUserLog(usuarioRegistrado);
            }
        },
        []
        );

    console.log(userList);
    const cargarUsuName = (e) =>{
        const value = e.target.value;
        setUserLog({...userLog,userName: value})
    } 
    const cargarUsuContraseña = (e) =>{
        const value = e.target.value;
        setUserLog({...userLog,password: value})
    } 
    const loginUsu = async() =>{
        const inputUser = document.getElementById('idUser');
        const inputContra = document.getElementById('passwordUser');
        const pAlert = document.getElementsByClassName('textAlert')
        const loguearUsuario = userList.find(user => user.userName===userLog.userName);
        console.log(loguearUsuario)
        
        if(!loguearUsuario){
            inputUser.value='';
            inputContra.value='';
            pAlert[0].style.display='block';
            pAlert[0].innerHTML='Usuario o contraseña incorrecto';
        }else if(loguearUsuario.password!==userLog.password){
            inputUser.value='';
            inputContra.value='';
            pAlert[0].style.display='block';
            pAlert[0].innerHTML='Usuario o contraseña incorrecto';
        }else{
            pAlert[0].style.display='none';
            localStorage.setItem('registrado',JSON.stringify(loguearUsuario));
            setRegistro(true);
        }
    }
    const cerrarSesion = () =>{
        localStorage.removeItem('registrado');
        setRegistro(false)
    }

    return (
        <>
        {!registro && (
        <div>
        <label for='idUser'>
            Usuario:
            <input type='text' id='idUser' name='userID' placeholder='Ingrese su nombre completo' onChange={(e)=>cargarUsuName(e)}></input>
            </label><br/>
            <label for='passwordUser'>
                Contraseña:
                <input type='password' id='passwordUser' name='userPass' minlength="6"  placeholder='Ingrese su contraseña' onChange={(e)=>cargarUsuContraseña(e)}></input>
            </label>
            <p className='textAlert'></p>
            <div className='ItemDetalleBtn ItemDetalleBtn--agregar' onClick={loginUsu}> iniciar sesion </div>
        </div>
        )}
        {
            registro && (<div>
                Usted Ya esta registrado con el usuario: {userLog.userName}
                <div className='ItemDetalleBtn ItemDetalleBtn--Volver' onClick={cerrarSesion}>Cerrar Sesion</div>
            </div>)
        }
        </>
    )
}

export default Login;