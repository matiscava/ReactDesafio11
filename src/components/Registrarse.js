import React, { useState, useEffect } from 'react';
import db from "../firebase";
import { onSnapshot , collection , addDoc } from "firebase/firestore";
// import { CartContext } from '../context/cartContext';


const Registrarse = () => {
    const [userList, setUserList] = useState([]);
    const [newUser, setNewUser] = useState({});
    const [registro, setRegistro] = useState(false)
    const [usuarioActivo, setUsuarioActivo] = useState([])
    
    useEffect(
        () =>{ 
        onSnapshot(collection(db,'usuarios'),(snapshot)=> {
            setUserList(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        })
        },
        []
        );
        useEffect(
            () =>{ 
            const usuarioRegistrado = JSON.parse(localStorage.getItem('registrado'))
                if(usuarioRegistrado){
                    setRegistro(true);
                    setUsuarioActivo(usuarioRegistrado);
                }
            },
            []
            );
        useEffect(() => {
            console.log('Usuario nuevo: ',newUser);
            const btn = document.getElementById('btnCargarUsuario');
            if(Object.keys(newUser).length<=3 || newUser.userName===''){
                btn.disabled=true;
            }else{
             btn.disabled=false;
            }
            
         }, [newUser]);
    
    
    const cargarMail = (evento) =>{
        const value = evento.target.value;

        const input = document.getElementById('mailUser');

        const pMail = document.querySelector('#textoMail');
        if(value.includes('@') && value.includes('.com')){
            setNewUser({...newUser,mail: value})
            pMail.style.display='none';
            input.classList.remove('inputError'); 
        }else{
            input.classList.add('inputError'); 
            pMail.style.display='block';
            pMail.innerHTML='Debe ingresar un mail existente';
        }
    }
   
    const handleNew = async () =>{
        const collectionRef = collection(db, 'usuarios');
        const inputName = document.getElementById('nombreUser');
        const inputEdad = document.getElementById('edadUser');
        const inputUser = document.getElementById('idUser');
        const contraUser = document.getElementById('passwordUser');
        const contra2User = document.getElementById('passwordUser2');
        const pAlert = document.getElementsByClassName('textAlert');
        if((contraUser.value !== contra2User.value)||contraUser.value===''||contra2User.value===''){
            pAlert[2].style.display='block';
            pAlert[2].innerHTML='las contraseñas no coinciden, intente nuevamente';
            contraUser.value='';
            contra2User.value='';
        }else{
            pAlert[2].style.display='none';
            localStorage.setItem('registrado',JSON.stringify(newUser));
            await addDoc(collectionRef,newUser);
            inputName.value='';
            inputEdad.value='';
            inputUser.value='';
            contraUser.value='';
            contra2User.value='';
            setNewUser({});
            setRegistro(true);
        }


    }
    const editNewUserContraseña = ()=> {
        const contraUser = document.getElementById('passwordUser');
        const contra2User = document.getElementById('passwordUser2');
        if((contraUser.value === contra2User.value)||contraUser.value!==''){
            setNewUser({...newUser, password:contraUser.value})
        }
    }
    const editNewUserName = (e) =>{
        const value = e.target.value;
        setNewUser({...newUser,nombre: value})
    }
    const editNewUserAge = (e) =>{
        const value = parseInt(e.target.value);
        setNewUser({...newUser,edad: value})
    }
    const ChequearUsuario = (e) =>{
        const nombreUsuario = e.target.value;
        let repetido = false;
        const pText = document.getElementsByClassName('textAlert');
        const input = document.getElementById('idUser');
        userList.map(usuario => {
            if(usuario.userName===nombreUsuario){
                repetido=true;
            }
        }
           
        )
        if(repetido){
            pText[0].innerHTML='Cambiar nombre de usuario, ese usuario ya esta utilizado';
            pText[0].style.display= 'block';
            input.classList.add('inputError'); 
            setNewUser({...newUser,userName:''});
        }else{
            pText[0].style.display= 'none';
            input.classList.remove('inputError'); 
            setNewUser({...newUser,userName:nombreUsuario});
        }
    }
    const catacteresPassword = (event) =>{
        if(event.charCode===32 || (event.charCode>=128 && event.charCode<=254)){
            event.preventDefault();
        }
        let contra = event.target.value;
        const minus = /[a-z]/.test(contra);
        const mayus = /[A-Z]/.test(contra);
        const num = /[0-9]/.test(contra);
        if(!minus&&!mayus&&!num){
            console.log('contraseña validada');
        }else{
            console.log('contraseña invalida')
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
            <h2>Registrate:</h2>
            <label for='nombreUser'>
                Nombre:
                <input type='text' id='nombreUser' name='nombre' placeholder='Ingrese su nombre completo' onChange={(e)=> editNewUserName(e)}></input>
            </label><br/>
            <label for='edadUser'>
                Edad:
                <input type='number' id='edadUser' name='edad' placeholder='Ingrese su edad' onChange={(e)=> editNewUserAge(e)}></input>
            </label><br/>
            <label for='idUser'>
                Usuario:
                <input type='text' id='idUser' name='userID' placeholder='Ingrese su usuario' onChange={(e)=>ChequearUsuario(e)}></input>
            </label>
            <p className='textAlert'></p>
            <br/>    
            <label for='mailUser'>
                Mail:
                <input type='text' id='mailUser' name='mail' placeholder='Ingrese su mail' onChange={(evento)=> cargarMail(evento)}></input>
            </label><br/>
            <p id='textoMail'></p>
            <label for='passwordUser'>
                Contraseña:
                <input type='password' id='passwordUser' name='userPass' minlength="6" onKeyPress={(event) => catacteresPassword(event)} placeholder='Ingrese su contraseña' ></input>
            </label>
            <p className='textAlert'></p>
            <br/>    
            <label for='passwordUser2'>
                Repite la contraseña:
                <input type='password' id='passwordUser2' name='userPass2' placeholder='Repita su contraseña' minlength="6" onKeyPress={(event) => catacteresPassword(event)} onChange={()=>editNewUserContraseña()}></input>
            </label>
            <p className='textAlert'></p>
            <br/>    
                <p>la contraseña debe tener minimo una minuscula, una mayuscula y un numero y debe tener una longitud minima de 6 carácteres</p>

            <button onClick={handleNew} id='btnCargarUsuario'>Registrarse</button>
        </div>
        )}
        {
            registro && (<div>
                Usted Ya esta registrado con el usuario: {usuarioActivo.userName}
                <div className='ItemDetalleBtn ItemDetalleBtn--Volver' onClick={cerrarSesion}>Cerrar Sesion</div>
            </div>)
        }
        </>
    )
}


export default Registrarse
