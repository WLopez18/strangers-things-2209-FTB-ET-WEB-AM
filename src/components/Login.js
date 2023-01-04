import React, { useState } from 'react';

const Login = (props) => {
    const exchangeTokenForUser = props.exchangeTokenForUser;
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');


    const loginPage = async (ev) => {
        ev.preventDefault();
        await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: loginUsername,
                    password: loginPassword
                }
            })
        }).then(response => response.json())
            .then(result => {
                result.success ? setMessage(result.data.message) : setMessage(result.error.message);
                const token = result.data.token;
                window.localStorage.setItem('token', token);
                exchangeTokenForUser();
                console.log(result.data.message)
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1 id='login-title'>Login</h1>
            <div>{message}</div>
            <form id='login-form' onSubmit={loginPage}>
                <input placeholder='username'
                    value={loginUsername}
                    onChange={ev => setLoginUsername(ev.target.value)} />
                <input placeholder='password'
                    type='password'
                    value={loginPassword}
                    onChange={ev => setLoginPassword(ev.target.value)} />
                <button disabled={!loginUsername || !loginPassword}>Login</button>
            </form>
        </div>
    );
}
export default Login;