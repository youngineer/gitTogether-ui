import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async() => {
        const connectionsApiUrl = `${BASE_URL}/user/connections`;
        try {
            const connectionsResponse = await axios.get(connectionsApiUrl, {withCredentials: true});
            console.log(connectionsResponse?.data?.body);
            dispatch(addConnections(connectionsResponse?.data?.body));
            
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        fetchConnections();
    }, []);

  return connections && (
  <div className="p-8 max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold text-white-800 mb-6">Your Connections</h1>
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {connections.map((connection, id) => (
        <div
          key={connection.id}
          className="flex bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
        >
          <img
            src={connection.photoUrl}
            alt={`${connection.firstName}'s avatar`}
            className="w-24 h-24 object-cover m-4 rounded-lg"
          />
          <div className="flex flex-col justify-between p-4 flex-1">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {connection.firstName} {connection.lastName}
              </h2>
              {connection.age && connection.gender && (
                <p className="text-sm text-blue-700">
                  {connection.age}, {connection.gender}
                </p>
              )}
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">{connection.about}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button className="text-sm px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Message
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default Connections