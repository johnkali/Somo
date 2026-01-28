import api from '../services/api.ts'
import {useContext,  useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.tsx";

 function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //if already logged in
 const {login} = useContext(AuthContext)!;
 const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        
        try {
            const res = await api.post("/auth/login", { email, password });
            console.log("LOGIN RESPONSE:", res.data);

            login(res.data.user, res.data.token); //update context
            //redirect to homepage
            navigate("/", {replace: true});
            // alert(`Welcome ${res.data.user.fname}`);

        } catch (error: any) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || "Login failed");
        }
    };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                  Welcome Back
              </h1>
              {/*<h3 className="text-lg text-gray-600 mb-4 text-center">Login Form</h3>*/}
              <p className="text-gray-500 text-center mb-6">
                  Enter your details below
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                      <label
                          htmlFor="email"
                          className="block text-gray-700 font-medium mb-1"
                      >
                          E-mail:
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  {/* Password */}
                  <div>
                      <label
                          htmlFor="password"
                          className="block text-gray-700 font-medium mb-1"
                      >
                          Password:
                      </label>
                      <input
                          type="password"
                          id="password"
                          placeholder="Enter Password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  {/* Submit button */}
                  <div>
                      <button
                          type="submit"
                        //   onSubmit={handleSubmit}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                      >
                          Login
                      </button>
                  </div>

                  {/* Register link */}
                  <div className="text-center text-gray-500 text-sm">
                      <p>
                          Don't have an account?{" "}
                          <Link to="/register" className="text-blue-600 hover:underline">
                              Register here
                          </Link>
                      </p>
                  </div>
              </form>
          </div>
      </div>

  )
}
export default Login