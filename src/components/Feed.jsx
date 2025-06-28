import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserToFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/feed", {
        withCredentials: true,
      });
      dispatch(addUserToFeed(res?.data?.data));
      console.log("URL:", BASE_URL + "/profile/feed", res?.data?.data)
      
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    getFeed()
    console.log("getFeed executed")
  }, []);

  const currentCard = feed[cardIndex];

  const handleNextCardLoad =() => {
    setCardIndex((prev) => prev + 1);
  }

  if (!feed) {
    return <h1 className="flex justify-center my-10">Loading...</h1>;
  }

  if (feed.length === 0 || cardIndex >= feed.length) {
    return <h1 className="flex justify-center my-10">No new users available!</h1>;
  }

  return (
  <div className="flex justify-center my-10" key={availableUser._id} >
      <UserCard user={currentCard} onClick={handleNextCardLoad} />
  </div>
  );
};

export default Feed;