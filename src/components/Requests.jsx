import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
      await fetchRequests();
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.body));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
  <div className="text-center my-10 px-4 max-w-4xl mx-auto">
    <h1 className="text-3xl font-semibold text-white mb-6">Connection Requests</h1>

    {requests.length === 0 ? (
      <p className="text-gray-400">No pending requests.</p>
    ) : (
      <div className="space-y-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
          console.log(_id);

          return (
            <div
              key={_id}
              className="flex flex-col md:flex-row items-center bg-base-300 p-6 rounded-lg shadow-md md:justify-between text-left"
            >
              <img
                alt="User avatar"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
              <div className="md:mx-6 flex-1 mt-4 md:mt-0">
                <h2 className="text-xl font-bold text-white">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-300 mt-1">{age}, {gender}</p>
                )}
                <p className="text-sm text-gray-400 mt-2">{about}</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => reviewRequest("rejected", request.fromUserId._id)}
                >
                  Reject
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  onClick={() => reviewRequest("accepted", request.fromUserId._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

};
export default Requests;