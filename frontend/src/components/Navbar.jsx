import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="GreenSpark Naturals Logo" />
            </div>

            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li>About</li>
                <li>Contact</li>
            </ul>


            <div className="navbar-actions">
                <button className="login-btn">Login</button>
            </div>
        </nav>
    );
}
