import { useState} from "react";
import api from '../services/api.ts';
import {Link} from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState('');
    const[secondName, setSecondName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');

   //  TODO
   //check password match between confirm and password


    const  handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            alert('Passwords do not match');
            return
        }
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6 text-center">
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">Registration Form</h1>
                  <p className="text-gray-500">Enter your information below.</p>
              </div>

              <form className="space-y-4">
                  {/* First Name */}
                  <div>
                      <label htmlFor="first-name" className="block text-gray-700 font-medium mb-1">
                          First Name
                      </label>
                      <input
                          type="text"
                          id="first-name"
                          name="firstName"
                          placeholder="First Name"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  {/* Second Name */}
                  <div>
                      <label htmlFor="second-name" className="block text-gray-700 font-medium mb-1">
                          Second Name
                      </label>
                      <input
                          type="text"
                          id="second-name"
                          name="secondName"
                          placeholder="Second Name"
                          required
                          value={secondName}
                          onChange={(e) => setSecondName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  {/* Email */}
                  <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                          E-mail
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  {/* Password */}
                  <div>
                      <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                          Password
                      </label>
                      <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Enter Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  {/* Confirm Password */}
                  <div>
                      <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-1">
                          Confirm Password
                      </label>
                      <input
                          type="password"
                          id="confirm-password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  {/* Submit Button */}
                  <div>
                      <button
                          type="submit"
                          onSubmit={handleSubmit}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                      >
                          Register
                      </button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center text-gray-500 text-sm">
                      <p>
                          Already have an account?{" "}
                          <Link to="/login" className="text-blue-600 hover:underline">
                              Login here
                          </Link>
                      </p>
                  </div>
              </form>
          </div>
      </div>
  );
}
export default Register;