import React, {useState} from 'react';
import {createUser } from '../../slice/slice'; 
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
          alert(regEmail)
          alert(regPassword)
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
        <>
        <h1 className='login__header'>Welcome to CV builder!</h1>

        
        <section className='login__wrapper'>
        <div className='login'> 
            <input placeholder='Username' className='login__username--input'onChange={(e) => {setEmail(e.target.value)} }></input>
            {badLogin && <h1 className='errorlogin'> Incorrect login or password</h1>}
            <br></br>
            <input placeholder='Password'type="password" className='login__password--input'onChange={(e) => {setPassword(e.target.value)}}></input>
            <br></br>
            <button className='login__button' onClick={loginHandle}>Login</button>
            <button className='login__button' onClick={(e) => {e.preventDefault(); setRegPage(true);}}>Register new user</button>
        </div>
        </section>
        {regPage && 
        <div className='popup-box'>
          <div className='box'>
            <h2>Register here!</h2>
          <input placeholder='Username' className='login__username--input'onChange={(e) => {setRegEmail(e.target.value)} }></input>
          <br></br>
          <input placeholder='Password'type="password" className='login__password--input'onChange={(e) => {setPassword(e.target.value)}}></input>
          <br></br>
          <button className='login__button' onClick={register}>Submit</button>
          <span className="close-icon" onClick={()=>{setRegPage(false);}}>x</span>
          </div>
        </div> 
        }
        </>
    )
}




export default Login;