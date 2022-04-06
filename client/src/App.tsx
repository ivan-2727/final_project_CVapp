import React from 'react';
import logo from './logo.svg';
import Login from './components/login/Login';
import './App.css';
import { Provider, TypedUseSelectorHook, useSelector } from "react-redux";
import {store} from "./store/store";
import { RootState } from './store/store';
import { Home } from './components/Home/Home';
import Main from './components/Main/Main';
import { useCookies } from "react-cookie";
import {useDispatch} from 'react-redux'; 
import {login_logout} from './slice/slice'

//const login = useAppSelector<boolean>((login) => login.login);

function App() {

  const dispatch = useDispatch();

  const [cookie, setCookie] = useCookies(); 
  if (cookie.login) {
    if (cookie.login.length > 0 ) dispatch(login_logout(true)); 
    else dispatch(login_logout(false));
  }
  else dispatch(login_logout(false)); 

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  
  const login = useAppSelector <boolean> ((state) => state.state.login); 

  return (
    <>
     { login ? <Home/> : <Login /> }
    </>
    
  );
}


// import { useSelector } from "react-redux"; 
// // other imports 
// interface TodoProps { 
//   todoId: number; 
// } 
// export const TodoListItem = ({ todoId }: TodoProps) => { 
  
//   return <p>{todo.text}</p>; 
// };
 export default App;
