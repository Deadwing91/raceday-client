import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Auth.css"

export const Register = () => {
    const email = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "password": password.current.value,
                "email": email.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("lu_token", res.token)
                        navigate("/login")
                    }
                })
        } else {
            passwordDialog.current.showModel()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <div className="register_header">
                <div className="series_title">Race Day</div>
            </div>

            <form className="form--login" onSubmit={handleRegister}>


                <div className="track__info">Register an account</div>

                <fieldset>
                    <label htmlFor="inputUsername"></label>
                    <input ref={username} type="text" name="username" className="form_login" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"></label>
                    <input ref={firstName} type="text" name="firstName" className="form_login" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"></label>
                    <input ref={lastName} type="text" name="lastName" className="form_login" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"></label>
                    <input ref={email} type="text" name="email" className="form_login" placeholder="Email" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"></label>
                    <input ref={password} type="password" name="password" className="form_login" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"></label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form_login" placeholder="Verify password" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-dark btn-lg" type="submit">Register</button>
                </fieldset>
            </form>
            {/* <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section> */}
        </main>
    )
}