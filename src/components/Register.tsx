import {useState} from "react";

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const[secondName, setSecondName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');



    const  handleSubmit = async (e)=>{
        e.preventDefault();
        let result = await fetch(
            'http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify({firstName, secondName, email, password}),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        result = await result.json();
        console.log("input:", result);
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
