import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleAction = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(_id));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    user && (
      <div className="card bg-base-300 w-66 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={user.photoUrl} alt="photo" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
          <p>
            {user.age}, {user.gender}
          </p>
          <p>
            Skills -{" "}
            {user.skills && user.skills.length
              ? user.skills.join(",")
              : user.skills}
          </p>
          <p>{user.about}</p>
          <div className="card-actions">
            <button
              className="btn btn-secondary"
              onClick={() => handleAction("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleAction("intrested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
