import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./Auth.css"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("lu_token", res.token)
                    navigate("/tracks")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <div className="login_header">
                    <div className="series_title">Race Day</div>
                    </div>
            <section>
                <form className="form--login" onSubmit={handleLogin}>

                    
                    <div className="track__info">Please sign in</div>
                    <fieldset>
                        <label htmlFor="inputUsername"></label>
                        <input ref={username} type="username" id="username" className="form_login" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"></label>
                        <input ref={password} type="password" id="password" className="form_login" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="btn btn-dark btn-lg" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            {/* <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section> */}
        </main>
    )
}