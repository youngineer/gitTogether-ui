import React from 'react'
import { useSelector } from 'react-redux'

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

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
                <div className="card-actions">
                <button className="btn btn-secondary">Ignore</button>
                <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard