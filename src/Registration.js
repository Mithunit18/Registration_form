import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        document.body.style.backgroundColor = "whitesmoke";

        const users = JSON.parse(localStorage.getItem('Users')) || [];

        const userEmail = users.find((userEmail) => userEmail.email === email);
        const userName = users.find((userName) => userName.name === name);


        if (userName) {
            setNameError('UserName Already Exists');
            setIsLoading(false);
            document.body.style.backgroundColor = "";
            return
        } if (userEmail) {
            setEmailError("Already Registered");
            setIsLoading(false);
            document.body.style.backgroundColor = "";
            return
        } if (!passwordPattern.test(password)) {
            setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.');
            setIsLoading(false);
            document.body.style.backgroundColor = "";
            return
        } else {
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('Users', JSON.stringify(users));
            toast.success("Registered Successfully !", {
                autoClose: 1000,
            });
            setName('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                setIsLoading(false);
                document.body.style.backgroundColor = "";
                navigate('/login');
            }, 1000);

        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError('');
    }

    const handleMailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    }
    const handleReset = () => {
        setName('');
        setEmail('');
        setPassword('');
        setNameError('');
        setEmailError('');
        setPasswordError('');
    }
    return (
        <>
            {!isloading && (
                <header>
                    <form className='my_form' onSubmit={handleSubmit}>
                        <p>Name</p>
                        <input
                            type="text"
                            id='name'
                            required
                            value={name}
                            onChange={handleNameChange}
                        />
                        {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                        <p>E-Mail</p>
                        <input
                            type="email"
                            id="mail"
                            required
                            value={email}
                            onChange={handleMailChange}
                        />
                        {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                        <p>Password</p>
                        <input
                            type='password'
                            id='password'
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

                        <div className="button-container">
                            <button type="submit" disabled={isloading}>Submit</button>
                            <button type="button" onClick={handleReset}>Reset</button>
                        </div>
                    </form>
                </header>
            )}
            {isloading && <div className="loading">Loading...</div>}
        </>

    );
}

export default Registration