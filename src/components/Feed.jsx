import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserToFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/feed", {
        withCredentials: true,
      });
      dispatch(addUserToFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return <h1 className="flex justify-center my-10">Loading...</h1>;
  }

  if (feed.length === 0) {
    return <h1 className="flex justify-center my-10">No new users available!</h1>;
  }

  const currentCard = feed[0];

  return (
    <div className="flex justify-center my-10" key={currentCard._id}>
      <UserCard user={currentCard} onClick={getFeed} />
    </div>
  );
};


export default Feed;