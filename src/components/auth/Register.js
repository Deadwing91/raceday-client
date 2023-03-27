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
                <div className="flag"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="White" class="bi bi-flag-fill" viewBox="0 0 16 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                </svg></div>
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