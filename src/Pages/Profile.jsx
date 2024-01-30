import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signOut } from "../redux/userSlice/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [successMes, setSuccessMes] = useState(null);
  const [formData, setFormData] = useState({
    Username: currentUser.data.Username,
    Email: currentUser.data.Email,
    Password: "",
    Name: currentUser.data.Name,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setSuccessMes(null);
      const res = await fetch(
        `https://p2carebackend.onrender.com/user/update/${currentUser.data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: currentUser.data.token,
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(signInSuccess(data.udata));
        setSuccessMes("Data updated successfully.....");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        `https://p2carebackend.onrender.com/user/delete/${currentUser.data._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: currentUser.data.token,
          },
        }
      );
      if (response.ok) {
        dispatch(signOut());
        navigate("/");
      } else {
        console.error("Failed to sign out account:", response.statusText);
      }
    } catch (error) {
      console.error("Error Sign Out account:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
              id="Name"
              defaultValue={formData.Name}
              onChange={changeHandler}
            ></input>
            <input
              type="text"
              placeholder="Username"
              className="border p-3 rounded-lg"
              id="Username"
              defaultValue={formData.Username}
              onChange={changeHandler}
            ></input>
            <input
              type="text"
              placeholder="Email"
              className="border p-3 rounded-lg"
              id="email"
              defaultValue={formData.Email}
              onChange={changeHandler}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg"
              id="password"
              onChange={changeHandler}
            ></input>

            <button
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
              onClick={handleUpdate}
            >
              Update Now
            </button>
          </form>
          {successMes && <p className="text-green-500 mt-2">{successMes}</p>}

          <div className="mt-6 float-end">
            <button
              className="text-red-500 hover:underline"
              onClick={handleSignOut}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
