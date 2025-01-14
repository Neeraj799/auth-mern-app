import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      toast.error("name, email, password is required", {
        position: "top-right",
      });
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message, {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (result.error) {
        console.log(result.error);

        const details = result.error?.details[0].message;
        console.log(details);

        toast.error(details, {
          position: "top-right",
        });
      } else {
        toast.error(result.message, {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error(err, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            value={signupInfo.name}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            value={signupInfo.email}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            value={signupInfo.password}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Signup
          </button>
        </div>
        <div>
          Already have an account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
