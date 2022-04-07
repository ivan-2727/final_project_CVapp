import { useDispatch } from 'react-redux'
import { login_logout } from '../../slice/slice';
import { useCookies } from "react-cookie";
import'./Nav.css'
import logo from './Resumate.@3x.png'

const Nav = () => {

  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(); 

  const handleLogout = () => {
    console.log('in nav compnewth');
    setCookie('login', ''); 
  }

  return (

    <nav className='nav--outer'>
    <span className="navbar">
      <img className='logo' src={logo} alt="" />
    </span>
</nav>
  )
}

export default Nav