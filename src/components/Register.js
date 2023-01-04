import React, { useState } from 'react';

const Register = () => {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const registerPage = (ev) => {
        ev.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: registerUsername,
                    password: registerPassword
                }
            })
        })
            .then(response => response.json())
            .then(result => {
                if (!result.success) {
                    throw result.error;
                }
                console.log(result);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1 id='registration-title'>Register</h1>
            <form id='register-form' onSubmit={registerPage}>
                <input placeholder='username'
                    value={registerUsername}
                    onChange={ev => setRegisterUsername(ev.target.value)} />
                <input placeholder='password'
                    type='password'
                    value={registerPassword}
                    onChange={ev => setRegisterPassword(ev.target.value)} />
                <button>Register</button>
            </form>
        </div>
    );
}


export default Register;