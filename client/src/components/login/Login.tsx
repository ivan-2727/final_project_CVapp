import React, {useState} from 'react';
import {loginActions} from '../../slice/slice'; 
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../slice/slice';
import './login.css'

const Login = () => {

    const dispatch = useDispatch();
    
    const [username, setUsername] = useState <string> ('');  
    const [password, setPassword] = useState <string> ('');  

    return (
        <>
        <section className='login__wrapper'>
        <form className='login' onSubmit={(e) => {
            e.preventDefault();
            dispatch(fetchUser({
                username: username,
                password: password
            }));
        }}> 
            <h1 className='login__header'>Welcome to<br></br> CV builder!</h1>
            <input placeholder='Username' className='login__username--input'onChange={(e) => {setUsername(e.target.value)} }></input>
            <br></br>
            <input placeholder='Password'type="password" className='login__password--input'onChange={(e) => {setPassword(e.target.value)}}></input>
            <br></br>
            <button className='login__button'type="submit">Login</button>
        </form>
        </section>
        </>
    )
}




export default Login;