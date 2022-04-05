import React, {useState} from 'react';
import {createUser, loginActions} from '../../slice/slice'; 
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../slice/slice';
import './login.css'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import { auth } from "../../firebase-config";
  import { User as FirebaseUser } from "firebase/auth";

const Login = () => {

    const dispatch = useDispatch();

    const [regEmail, setRegEmail] = useState <string> (''); 
    const [regPassword, setRegPassword] = useState <string> (''); 
    const [email, setEmail] = useState <string> ('');  
    const [password, setPassword] = useState <string> ('');  
    const [user, setUser] = useState<FirebaseUser | null>(null);

    onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser);
        setUser(currentUser);
      });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
              auth,
              regEmail,
              regPassword
            );
            dispatch(createUser({
              uid: user.user.uid
            }));
            console.log(user);
          } catch (error:any) {
            console.log(error.message);
          }
    }

    const loginHandle = async () => {
        try {
          console.log('starting login');
            const user = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            dispatch(fetchUser({
              uid: user.user.uid
          }));
            // console.log('login success with: ', user);
          } catch (error:any) {
            console.log(error.message);
          }
    }

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <>
        <h1 className='login__header'>Welcome to<br></br> CV builder!</h1>
        <h2>Hello {user && user.email}!</h2>
        <section className='register__wrapper'>
        <div className='register'> 
            <input placeholder='Username' className='register__username--input' onChange={(e) => {setRegEmail(e.target.value)} }></input>
            <br></br>
            <input placeholder='Password' type="password" className='register__password--input' onChange={(e) => {setRegPassword(e.target.value)}}></input>
            <br></br>
            <button className='register__button' onClick={register}>Create account</button>
        </div>
        </section>

        <section className='login__wrapper'>
        <div className='login'> 
            <input placeholder='Username' className='login__username--input'onChange={(e) => {setEmail(e.target.value)} }></input>
            <br></br>
            <input placeholder='Password'type="password" className='login__password--input'onChange={(e) => {setPassword(e.target.value)}}></input>
            <br></br>
            <button className='login__button' onClick={loginHandle}>Login</button>
        </div>
        <button className='logout__button' onClick={logout}>Logout</button>
        </section>
        </>
    )
}




export default Login;