export default function Register() {
    function handleSubmit(e){
        e.preventDefault();
        console.log("Button clicked!")
    }
  return (
    <div>
      <div>
        <h1>Registration Form</h1>
        <p>Enter your information below..</p>
      </div>
      <form action={handleSubmit}>
       <div>
         <label htmlFor="first-name">First Name
        </label>
        <input id="first-name"  type="text" name="firstName" required placeholder="First name" />

       </div>
       <div>
          <label htmlFor="second-name">Second Name
        </label>
        <input id="second-name" type="text" name="secondName" required placeholder="Second name" />

       </div>
        <div>
             <label htmlFor="email">E-mail
        <input id="email" type="email" name="email" required placeholder="E-mail" />
        </label>
        </div>
        <div>
             <label htmlFor="password">Password
        <input  type="password" id="password" name="password" required placeholder="Password" />
        </label>
        </div>
        <div>
             <label> Confirm Password
        <input  type="password" name="confirmPassword" required placeholder="Confirm Password" />
        </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
