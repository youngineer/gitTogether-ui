import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      fetchRequests()
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.body));
      console.log(res?.data?.body)
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return <h1 className="flex justify-center text-xl text-gray-500 mt-10">No Requests Found</h1>;

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Connection Requests</h1>

      <div className="space-y-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-xl bg-white shadow-md"
            >
              <img
                alt="User"
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-200"
                src={photoUrl}
              />

              <div className="flex-1 min-w-[200px]">
                <h2 className="text-xl font-semibold text-gray-800">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-500">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-sm text-gray-700 mt-1 line-clamp-3">{about}</p>
              </div>

              <div className="flex gap-3">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => reviewRequest("rejected", _id)}
                >
                  Reject
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => reviewRequest("accepted", _id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
