import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user, isForEditProfile }) => {
    const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
    const dispatch = useDispatch();

    const handleSendConnection= async(status, userId) => {
        const sendConnectionApiUrl = BASE_URL + "/request/send/" + status + "/" + userId;
        console.log(sendConnectionApiUrl);

        try {
            const sendConnectionResponse = await axios.post(sendConnectionApiUrl, {}, {
                withCredentials: true
            });
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div id={_id}>
            <div className="card bg-base-300 w-96 shadow-sm m-8">
                <figure className="px-10 pt-10">
                    <img
                    src={photoUrl}
                    alt="User Photo"
                    className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {(age && gender) && <p>{age}, {gender}</p>}
                    <p>{about}</p>
                    {!isForEditProfile && (
                        <div className="card-actions">
                            <button className="btn btn-secondary" onClick={() => handleSendConnection("ignored", _id)}>Ignore</button>
                            <button className="btn btn-primary" onClick={() => handleSendConnection("interested", _id)}>Interested</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserCard