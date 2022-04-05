import React from 'react';
import logo from './logo.svg';
import Login from './components/login/Login';
import './App.css';
import { Provider, TypedUseSelectorHook, useSelector } from "react-redux";
import {store} from "./store/store";
import { RootState } from './store/store';
import { Home } from './components/Home/Home';
import Main from './components/Main/Main';

//const login = useAppSelector<boolean>((login) => login.login);

function App() {
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
