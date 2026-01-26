import {useState} from "react";
import api from '../services/api.ts';

function Register() {
    const [firstName, setFirstName] = useState('');
    const[secondName, setSecondName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');



    const  handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        try{
            await api.post("/auth/register", {
                firstName: firstName,
                secondName: secondName,
                email: email,
                password: password,
            });
            alert("User added successfully.");

        }catch (error){
            console.error(error);
            alert("Registration failed!");
        }
    }
  return (
    <div>
      <div>
        <h1>Registration Form</h1>
        <p>Enter your information below..</p>
      </div>
      <form action="">
       <div>
         <label htmlFor="first-name">First Name
        </label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id="first-name"  type="text" name="firstName" required placeholder="First name" />

       </div>
       <div>
          <label htmlFor="second-name">Second Name
        </label>
        <input value={secondName} onChange={(e)=>setSecondName(e.target.value)} id="second-name" type="text" name="secondName" required placeholder="Second name" />

       </div>
        <div>
             <label htmlFor="email">E-mail
        <input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" type="email" name="email" required placeholder="E-mail" />
        </label>
        </div>
        <div>
             <label htmlFor="password">Password
        <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" id="password" name="password" required placeholder="Password" />
        </label>
        </div>
        <div>
             <label htmlFor="confirm-password"> Confirm Password
        <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} id="confirm-password"  type="password" name="confirmPassword" required placeholder="Confirm Password" />
        </label>
        </div>
        <button onClick={handleSubmit} type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Register;