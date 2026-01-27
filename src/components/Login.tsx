import api from '../services/api.ts'
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

 function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
     const navigate = useNavigate();

    //if already logged in
     useEffect(() => {
         const token = localStorage.getItem("token");
         if(token){
             navigate("/");
         }
     }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });
            console.log("LOGIN RESPONSE:", res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user))

            //redirect to homepage
            navigate("/");

            alert(`Welcome ${res.data.user.fname}`);

        } catch (error: any) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || "Login failed");
        }
    };

  return (
    <div>
        <h1>Welcome Back</h1>
        <h3>Login Form</h3>
        <p>Enter your details below</p>
        <form action="">
            <div>
            <label htmlFor="email">E-mail:</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} id="email" required placeholder='Enter Email' name="email"/>
        </div>
        <div>
             <label htmlFor="password">First Name:</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} id="pasword" required placeholder='Enter Password' />
        </div>
        <div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
            <div>
                <p>If you don't have an account <Link to="/register">Register here</Link>
                </p>
            </div>
        </form>
        
    </div>

  )
}
export default Login