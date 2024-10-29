import { Link, Outlet} from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"
import logo from "../../src/assets/Logo.png"
import './Navbar.css'

function Navbar() {
    return (

        <nav className="navbar">
            <div>
            <Link to={"/"}><img className="logo" src={logo} alt="Logo de la pagina"/></Link>
                
            </div>

            <ul className="menu-links">
                <li className="menu-item">
                    <Link to={"/"}>Home</Link>
                </li>
                
                <li className="menu-item">
                    <Link to={"/category/:idCategory"}>Productos</Link>
                </li>
            </ul>

            <Link to={'/cart'}><CartWidget /></Link>
        </nav>
    )
}

export default Navbar
