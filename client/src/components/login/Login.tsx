import React, {useState} from 'react';
import {loginActions} from '../../slice/slice'; 
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../slice/slice';


const Login = () => {

    const dispatch = useDispatch();
    
    const [username, setUsername] = useState <string> ('');  
    const [password, setPassword] = useState <string> ('');  

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(fetchUser({
                username: username,
                password: password
            }));
        }}> 
            <label htmlFor="">Username: </label>
            <input onChange={(e) => {setUsername(e.target.value)} }></input>
            <label htmlFor="">Password: </label>
            <input onChange={(e) => {setPassword(e.target.value)}}></input>
            <button type="submit">Login</button>
        </form>
    )
}




export default Login;