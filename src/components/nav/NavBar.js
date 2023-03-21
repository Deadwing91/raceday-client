import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className="navbar__wrapper">
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tracks">Tracks</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/series">Series</Link>
            </li>
            <li className="navbar__item active">
            <Link className="navbar__link" to="/">Map</Link>
            </li>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="navbar__item active">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item active">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="navbar__item active">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
            </div>
    )
}