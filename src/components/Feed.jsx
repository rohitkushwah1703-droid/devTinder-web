import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("---", res.data.data);
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  if (!feed) return;
  if (!feed || feed.length === 0) {
    return <h2 className="text-center mt-5 text-xl">No Users found</h2>;
  }
  return (
    feed && (
      <div className="flex justify-center my-5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
