import React, { ChangeEvent, useEffect, useState } from 'react';
import './UserProfilePage.css';
import { useCheckProfile } from '../../hooks/useCheckProfile';
import { AccountDetailDto } from '../../dto/accounts/account-detail.dto';
import { AccountsService } from '../../services/accounts.service';
import { AxiosError } from 'axios';
import { MainLayout } from '../../layouts/MainLayout';
import { LocalFilesService } from '../../services/local-files.service';
import { Link } from 'react-router-dom';

const UserProfilePage: React.FC = () => {
  let [isUpdated, setIsUpdated] = useState(false);
  let [avtFile, setAvtFile] = useState<File | null>(null);

  const [userData, setUserData, accessToken] = useCheckProfile();

  const accountsService = AccountsService.getInstance();
  const localFilesService = LocalFilesService.getInstance();

  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [detail, setDetail] = useState<AccountDetailDto>({
    age: 0,
    email: '',
    fname: '',
    lname: '',
    avt: ''
  });

  useEffect(() => {
    setDetail(userData.detail ?? detail)
  }, [userData]);

  const handleChangeDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpdated(true);
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const validateDetail = () => {
    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdated && validateDetail()) {
      let url = detail.avt;
      if (avtFile) {
        const data = await localFilesService.upload(avtFile);
        url = data.url;
      }
      accountsService
        .updateAccountDetail({ ...detail, avt: url }, accessToken)
        .then((data) => {
          setUserData(data);
          setSuccessMessage('Update profile successfully!');
          setGeneralError('');
        })
        .catch((err) => {
          setSuccessMessage('');
          if (err instanceof AxiosError) {
            setGeneralError(err.response?.data.message);
          } else {
            console.log(err);
            setGeneralError("Unknow error!");
          }
        });

      setIsUpdated(false);
    }
  }

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUpdated(true);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!file) return;

      const newAvatarUrl = URL.createObjectURL(file);
      setAvtFile(file);
      setDetail({ ...detail, avt: newAvatarUrl });
    }
  };


  return (
    <MainLayout>
      <div className="user-profile">
        <div className="profile-avatar-container">
          <img src={detail.avt || 'https://via.placeholder.com/300'} alt="Profile Avatar" className="profile-avatar" />
          {/* Additional profile info here */}
        </div>
        <div className="profile-header">
          <h2>{`${userData.detail?.lname} ${userData.detail?.fname}`}</h2>
          <p>Email: {userData.detail?.email}</p>
          <p>Age: {userData.detail?.age}</p>
          <Link to={`/user/${userData.id}`}>View Public Profile</Link>
        </div>
        <form className="profile-update-form" onSubmit={handleSubmit}>
          <h3>Update Profile</h3>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {generalError && <div className="error-message">{generalError}</div>}
          <div>
            <label htmlFor="">Avatar</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="fname" value={detail.fname} onChange={handleChangeDetail} />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lname" value={detail.lname} onChange={handleChangeDetail} />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={detail.email} onChange={handleChangeDetail} />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={detail.age} onChange={handleChangeDetail} />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </MainLayout>

  );
};

export default UserProfilePage;
