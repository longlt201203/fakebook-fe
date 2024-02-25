import React from 'react';
import './UserProfilePage.css';
import { useCheckProfile } from '../../hooks/useCheckProfile';

const UserProfilePage: React.FC = () => {
  const userData = useCheckProfile();

  return (
    <div className="user-profile">
      <div className="profile-header">
        {/* <img src={userData.profilePictureUrl} alt="Profile" className="profile-picture"/> */}
        <h2>{userData.username}</h2>
        {/* <p>{userData.email}</p> */}
        {/* <p>Last login: {readableDate(userData.lastLogin)}</p>*/}
      </div>
      <form className="profile-update-form" onSubmit={e => e.preventDefault()}>
        <h3>Update Profile</h3>
        {/* Form fields for updating profile (name, email, etc.) */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserProfilePage;
