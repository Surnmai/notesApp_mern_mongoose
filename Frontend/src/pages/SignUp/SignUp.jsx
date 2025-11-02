import React from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";

// import context
import { useGlobalContext } from "../../Context";

// import validateEmail
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    name,
    setName,
  } = useGlobalContext();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!name) {
      return setError("Please enter your name");
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }

    if (!password) {
      return setError("Please enter your password");
    }

    setError("");

    // Sign Up API call
  };
  return (
    <>
      <div className=" grid place-items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create an Account
            </button>

            <p>
              Already have an account?
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
