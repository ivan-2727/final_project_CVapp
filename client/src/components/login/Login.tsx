import React, {useState} from 'react';
import {createUser } from '../../slice/slice'; 
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../slice/slice';
import './login.css'
import logo from './Resumate.@3x.png'
import photo from './photo2.png'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import { auth } from "../../firebase-config";
  import { User as FirebaseUser } from "firebase/auth";
  import { useCookies } from "react-cookie";

const Login = () => {

    const dispatch = useDispatch();
    const [cookie, setCookie] = useCookies(); 

    const [regEmail, setRegEmail] = useState <string> (''); 
    const [regPassword, setRegPassword] = useState <string> (''); 
    const [email, setEmail] = useState <string> ('');  
    const [password, setPassword] = useState <string> ('');  
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [badLogin, setBadLogin] = useState<boolean> (false);
    const [regPage, setRegPage] = useState<boolean> (false);

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
            setRegPage(false)
            console.log(user);
          } catch (error:any) {
            console.log(error.message);
          }
    }

    const loginHandle = async () => {
        try {
            const user = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            dispatch(fetchUser({
              uid: user.user.uid
            }));
            setCookie('login', user.user.uid);
          } catch (error:any) {
            setBadLogin(true); 
            setInterval(() => {
              setBadLogin(false);
            }, 20*1000);
            console.log(error.message);
          }
    }

    const logout = async () => {
        await signOut(auth);
    }

    return (
      <div className='landing-page'>
         <div className='header'>
          <img src={logo} className='header__logo' alt=''/>
          <button className="button header__login" onClick={() => window.scrollTo({ top: 1700, left: 0, behavior: 'smooth' })}>login</button>
        </div>
        <h2 className='description'> Land your dream job with automated resumes <br/> by Resumate.  </h2>
        <button className="button description__button" onClick={() => window.scrollTo({ top: 900, left: 0, behavior: 'smooth' })}>start</button>
        <div className='landing__second'>
        <section className='login__wrapper'>
        <div className='login'> 
            <input placeholder='Username' className='login__username--input'onChange={(e) => {setEmail(e.target.value)} }></input>
            {badLogin && <h1 className='errorlogin'> Incorrect login or password</h1>}
            <br></br>
            <input placeholder='Password'type="password" className='login__password--input'onChange={(e) => {setPassword(e.target.value)}}></input>
            <br></br>
            <button className='button login__button' onClick={loginHandle}>Login</button>
            <button className='button login__button' onClick={(e) => {e.preventDefault(); setRegPage(true);}}>Register new user</button>
        </div>
        </section>
        <img src={photo} className='landing__photo' alt=''></img>
        </div>
        {regPage && 
        <div className='popup-box'>
          <div className='box'>
            <h2>Register here!</h2>
          <input placeholder='Username' className='login__username--input'onChange={(e) => {setRegEmail(e.target.value)} }></input>
          <br></br>
          <input placeholder='Password'type="password" className='login__password--input'onChange={(e) => {setRegPassword(e.target.value)}}></input>
          <br></br>
          <button className='button login__button' onClick={register}>Submit</button>
          <span className="close-icon" onClick={()=>{setRegPage(false);}}>&#215;</span>
          </div>
        </div> 
        }
        <section className='footer'>
          <p>2023-2022 &#169; CodeKraken</p>
        </section>
        </div>
    )
}




export default Login;