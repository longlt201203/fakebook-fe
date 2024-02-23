import React, { useEffect, useState } from 'react';
import './UserProfilePage.css';
import { AuthService } from '../../services/auth.service';
import { AccountResponseDto } from '../../dto/accounts/responses/account-response.dto';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const UserProfilePage: React.FC = () => {
    const authService = AuthService.getInstance();

    const navigate = useNavigate();

  const [userData, setUserData] = useState<AccountResponseDto>({
    id: "",
    username: "",
    password: ""
  });

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) {
        navigate('/');
    } else {
        authService.profile(accessToken)
                    .then((data) => {
                        setUserData(data);
                    })
                    .catch((err) => {
                        let message = 'Unkown error';
                        if (err instanceof AxiosError) {
                            message = err.response?.data.message;
                        } else {
                            console.log(err);
                        }
                        alert(message);
                        navigate('/');
                    })
    }
  }, []);

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
