import { useState } from 'react'
import loginService from "../services/Login"
import Notificiation from './notification'
import blogService from '../services/blogs'

const Login = ({ setUser }) => {

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUsername("")
            setPassword("")
            setUser(user)

        } catch (e) {
            setNotification('Invalid username or password')

            setTimeout(() => {
                setNotification("")
            }, 4000);
        }


    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [notification, setNotification] = useState("")

    return <>

        < Notificiation message={notification} />

        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    id='username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    id='password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="submit_login" type="submit">login</button>
        </form>
    </>
}

export default Login