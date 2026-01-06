import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/pendingRequests", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReview = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests || requests.length === 0) {
    return <h2 className="text-center mt-5 text-xl">No requests found</h2>;
  }

  return (
    <>
      {requests &&
        requests.map((r, index) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            r.fromUserId;

          return (
            <div
              key={index} // ideally use r.id if available
              className="hero bg-base-300 max-w-2xl mx-3 my-3 rounded-lg shadow-lg p-3"
            >
              <div className="hero-content flex-col lg:flex-row gap-4 p-2">
                <img
                  src={photoUrl}
                  className="w-20 rounded-lg shadow-xl"
                  alt={`${firstName} ${lastName}`}
                />
                <div>
                  <h2 className="font-bold">
                    {firstName} {lastName}
                  </h2>
                  <p className="font-semibold text-sm">
                    {age}, {gender}
                  </p>
                  <p className="font-sans text-sm py-2">{about}</p>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleReview("rejected", r._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleReview("accepted", r._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Requests;
