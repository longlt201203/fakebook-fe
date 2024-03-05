// RegistrationPage.tsx
import React, { ChangeEvent, useState } from 'react';
import { CreateAccountRequestDto } from '../../dto/accounts/requests/create-account-request.dto';
import './RegistrationPage.css';
import { AccountsService } from '../../services/accounts.service';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AccountDetailDto } from '../../dto/accounts/account-detail.dto';
import { MainLayout } from '../../layouts/MainLayout';
import { LocalFilesService } from '../../services/local-files.service';
import { Globals } from '../../utils/Globals';

const RegistrationPage: React.FC = () => {
    const accountsService = AccountsService.getInstance();
    const localFilesService = LocalFilesService.getInstance();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateAccountRequestDto>({ username: '', password: '' });
    const [detailData, setDetailData] = useState<AccountDetailDto>({ age: 0, email: '', fname: '', lname: '', avt: '' });
    const [formErrors, setFormErrors] = useState<CreateAccountRequestDto>({ username: '', password: '' });
    const [generalError, setGeneralError] = useState('');
    let [avtFile, setAvtFile] = useState<File | null>(null);

    const validateForm = (): boolean => {
        let isValid = true;
        let errors: CreateAccountRequestDto = { username: '', password: '' };

        if (!formData.username) {
            isValid = false;
            errors.username = 'Username is required';
        }
        if (!formData.password || formData.password.length < 6) {
            isValid = false;
            errors.password = 'Password must be at least 6 characters long';
        }

        setFormErrors(errors);
        return isValid;
    };

    const validateDetail = (): boolean => {
        return true;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetailData({ ...detailData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm() && validateDetail()) {
            let url = detailData.avt;
            if (avtFile) {
                const data = await localFilesService.upload(avtFile);
                url = data.url;
            }
            formData.detail = { ...detailData, avt: url };
            console.log('Registration data:', formData);
            // Submit form data to the server for registration
            accountsService.createAccount(formData)
                .then((data) => {
                    navigate('/');
                })
                .catch((err) => {
                    if (err instanceof AxiosError) {
                        setGeneralError(err.response?.data.message);
                    } else {
                        console.log(err);
                        setGeneralError("Unknow error!");
                    }
                });
        }
    };

    const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (!file) return;

            const newAvatarUrl = URL.createObjectURL(file);
            setAvtFile(file);
            setDetailData({ ...detailData, avt: newAvatarUrl });
        }
    };

    return (
        <MainLayout>
            <div className="profile-avatar-container">
                <img src={detailData.avt || Globals.DEFAULT_IMAGE} alt="Profile Avatar" className="profile-avatar" />
                {/* Additional profile info here */}
            </div>
            <form className="registration-form" onSubmit={handleSubmit}>
                {generalError && <div className="error-message">{generalError}</div>}
                <div>
                    <label htmlFor="">Avatar</label>
                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                    {formErrors.username && <p className="error-message">{formErrors.username}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="fname" value={detailData.fname} onChange={handleChangeDetail} />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lname" value={detailData.lname} onChange={handleChangeDetail} />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={detailData.email} onChange={handleChangeDetail} />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" value={detailData.age} onChange={handleChangeDetail} />
                </div>
                <button type="submit">Register</button>
            </form>
        </MainLayout>
    );
};

export default RegistrationPage;
