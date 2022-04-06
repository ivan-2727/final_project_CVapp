import { useDispatch } from 'react-redux'
import { login_logout } from '../../slice/slice';
import { useCookies } from "react-cookie";
import'./Nav.css'

const Nav = () => {

  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(); 

  const handleLogout = () => {
    console.log('in nav compnewth');
    setCookie('login', ''); 
  }

  return (
    <nav className='nav--outer'>
        <span className="navbar">CV Builder</span>
       <span> <button className="button__logout" onClick={handleLogout}>Log out</button></span>
    </nav>

  )
}

export default Nav