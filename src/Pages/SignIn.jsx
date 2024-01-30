import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  allError,
} from "../redux/userSlice/userSlice";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allError());
  }, [dispatch]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("https://p2carebackend.onrender.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (err) {
      dispatch(signInFailure(err.message || "An error occurred"));
    }
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>

        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="Email"
            value={formData.Email} // Add value attribute
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="Password"
            value={formData.Password}
            onChange={changeHandler}
          />

          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Do not Have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInFailure,
//   signInStart,
//   signInSuccess,
//   allError,
// } from "../../redux/userSlice/userSlice";
// import { useEffect, useState } from "react";

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     Email: "",
//     Password: "",
//   });

//   const { loading, error } = useSelector((state) => state.user);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(allError());
//   }, [dispatch]);

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());

//       const res = await fetch("https://p2carebackend.onrender.com/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         dispatch(signInFailure(errorText));
//         return;
//       }

//       const data = await res.json();
//       dispatch(signInSuccess(data));
//       console.log(data);
//       navigate("/home");
//     } catch (err) {
//       dispatch(signInFailure(err.message));
//     }
//   };

//   return (
//     <div>
//       <div className="p-3 max-w-lg mx-auto">
//         <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>

//         <form className="flex flex-col gap-4" onClick={submitHandler}>
//           <input
//             type="text"
//             placeholder="Email"
//             className="border p-3 rounded-lg"
//             id="Email"
//             onChange={changeHandler}
//           ></input>
//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-3 rounded-lg"
//             id="Password"
//             onChange={changeHandler}
//           ></input>

//           <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
//             {loading ? "Loading..." : "Sign In"}
//           </button>
//         </form>
//         <div className="flex gap-2 mt-5">
//           <p>Do not Have an account?</p>
//           <Link to={"/sign-up"}>
//             <span className="text-blue-700">Sign Up</span>
//           </Link>
//         </div>
//         {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default SignIn;
