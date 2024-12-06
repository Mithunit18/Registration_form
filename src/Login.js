import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("Users")) || [];

    const user = users.find((user) => user.email === email);

    if (user) {
      if (user.password === password) {
        toast.success('Login successful', {
          autoClose: 1800,
        });
        setEmail('');
        setPassword('');
      } else {
        toast.error('Invalid password', {
          autoClose: 1800,
        });
      }
    } else {
      toast.error('Email not found', {
        autoClose: 1800,
      });
    }
  };

  const handleBack = () => {
    navigate('/');
  }

  return (
    <main>
      <form className="login_form" onSubmit={handleSubmit}>
        <p>Email-ID</p>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <div className="buttons">
          <button type="button" onClick={handleBack}>Back</button>
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
