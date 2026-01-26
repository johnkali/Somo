import api from '../services/api.ts'
import {useState} from "react";

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });
            console.log("LOGIN RESPONSE:", res.data);

            // Save token in localStorage
            localStorage.setItem("token", res.data.token);

            alert(`Welcome ${res.data.user.fname}`);

        } catch (error: any) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || "Login failed");
        }
    }

  return (
    <div>
        <h1>Welcome Back</h1>
        <h3>Login Form</h3>
        <p>Enter your details below</p>
        <form action="">
            <div>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" required placeholder='Enter Email' name="email"/>
        </div>
        <div>
             <label htmlFor="password">First Name:</label>
            <input type="password" id="pasword" required placeholder='Enter Password' />
        </div>
        <div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </form>
        
    </div>

  )
}
