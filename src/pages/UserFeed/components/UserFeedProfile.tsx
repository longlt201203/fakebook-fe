import React, { PropsWithChildren } from 'react';
import { AccountResponseDto } from '../../../dto/accounts/responses/account-response.dto';
import "./UserFeedProfile.css";
import { Globals } from '../../../utils/Globals';

const UserFeedProfile = ({ user }: PropsWithChildren<{ user: AccountResponseDto }>) => {
  if (!user) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return (
    <div className="user-feed-profile-card">
      <div className="user-feed-profile-avatar">
        <img src={user.detail?.avt || Globals.DEFAULT_IMAGE} alt={`avatar`} className="user-feed-avatar-image"/>
      </div>
      <div className="user-feed-profile-details">
        <h2 className="user-feed-name">{user.detail?.fname} {user.detail?.lname}</h2>
        {/* You can add additional details here */}
      </div>
    </div>
  );
};

export default UserFeedProfile;