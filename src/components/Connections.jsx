import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/myConnections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections || connections.length === 0) {
    return <h2 className="text-center mt-5 text-xl">No connections found</h2>;
  }

  return (
    <>
      {connections &&
        connections.map((c, index) => (
          <div
            key={index} // You should ideally use a unique id from `c`, e.g., c.id
            className="hero bg-base-300 max-w-2xl mx-3 my-3 rounded-lg shadow-lg p-3"
          >
            <div className="hero-content flex-col lg:flex-row gap-4 p-2">
              <img
                src={c.photoUrl}
                className="w-20 rounded-lg shadow-xl"
                alt="Box Office"
              />
              <div>
                <h2 className="font-bold">
                  {c?.firstName} {c?.lastName}
                </h2>
                <p className="font-semibold text-sm">
                  {c.age}, {c.gender}
                </p>
                <p className="font-sans text-sm py-2">{c.about}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Connections;
