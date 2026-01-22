import React from 'react'

export default function Login () {

    function handleSubmit(e){
        e.preventDefault();
        console.log("Log in clicked!")
    }
  return (
    <div>
        <h1>Welcome Back</h1>
        <h3>Login Form</h3>
        <p>Enter your details below</p>
        <form action={handleSubmit}>
            <div>
            <label htmlFor="first-name">First Name:</label>
            <input type="text" id="first-name" required placeholder='Enter First Name' />
        </div>
        <div>
             <label htmlFor="password">First Name:</label>
            <input type="password" id="pasword" required placeholder='Enter Password' />
        </div>
        <div>
            <button>Submit</button>
        </div>
        </form>
        
    </div>

  )
}
