// RegistrationPage.tsx
import React, { useState } from 'react';
import { CreateAccountRequestDto } from '../../dto/accounts/requests/create-account-request.dto';
import './RegistrationPage.css';
import { AccountsService } from '../../services/accounts.service';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AccountDetailDto } from '../../dto/accounts/account-detail.dto';

const RegistrationPage: React.FC = () => {
    const accountsService = AccountsService.getInstance();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateAccountRequestDto>({ username: '', password: '' });
    const [detailData, setDetailData] = useState<AccountDetailDto>({ age: 0, email: '', fname: '', lname: '' });
    const [formErrors, setFormErrors] = useState<CreateAccountRequestDto>({ username: '', password: '' });
    const [generalError, setGeneralError] = useState('');

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm() && validateDetail()) {
            formData.detail = detailData;
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

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            {generalError && <div className="error-message">{generalError}</div>}
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
    );
};

export default RegistrationPage;
