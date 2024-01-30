import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(null);

  const navigate = useNavigate();
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSignupSuccess(null);
      const res = await fetch("https://p2carebackend.onrender.com/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSignupSuccess("User register SuccessFully...!");
      } else {
        const errorText = await res.text();
        setError(errorText);
        return;
      }
      navigate("/sign-in");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Register</h1>

          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
              id="Name"
              onChange={changeHandler}
            ></input>
            <input
              type="text"
              placeholder="Username"
              className="border p-3 rounded-lg"
              id="Username"
              onChange={changeHandler}
            ></input>
            <input
              type="text"
              placeholder="Email"
              className="border p-3 rounded-lg"
              id="Email"
              onChange={changeHandler}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg"
              id="Password"
              onChange={changeHandler}
            ></input>

            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-blue-700">Sign In</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
          {signupSuccess && (
            <p className="text-green-500 mt-2">{signupSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
