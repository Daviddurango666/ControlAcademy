import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import '../App.css';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/usuario/login",{id, password});
            const data = res.data;
            // sessionStorage.setItem("usuario", JSON.stringify(data.user))
            // sessionStorage.setItem("token", JSON.stringify(data.token))
            localStorage.setItem("usuario", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(data.token));
            console.log("Login exitoso: ", data);
            navigate("/dashboard");
        }catch(error) {
            console.log("Error al iniciar sesion: ", error.message);
        }
    }

    return (
        <> 
        <div className="body-login">
            <div className="blur-overlay"></div>
                <div className="content-login">
                    <div className="login-box">
                        <form id="loginForm" onSubmit={handleLogin}>
                            <h1 className='logo-login'>ControlAcademy</h1>
                            <div className="separador-login"></div>
                            <span className='span-login'>Accede a tu plataforma academica</span>
                            <label>ID:</label>
                            <input 
                                type="numbre" 
                                name='id' 
                                id='id' 
                                placeholder='Ingresa tu ID'
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                            <label>Password:</label>
                            <input 
                                type="password" 
                                name='password'    
                                id='password' 
                                placeholder='Ingresa tu contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className='button-login' type="submit">Iniciar Sesion</button>
                        </form>
                    </div>
                </div>
            </div>          
        </>
    )
}

export default Login;