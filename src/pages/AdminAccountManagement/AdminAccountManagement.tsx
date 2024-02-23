import React, { useState } from 'react';
import { AccountDetails, UserAccount } from './AccountTypes';
import styles from './AdminAccountManagement.module.css';
import { CreateAccountRequestDto } from '../../dto/accounts/requests/create-account-request.dto';
import { AccountsService } from '../../services/accounts.service';

// Mock data for demonstration
const usersData: UserAccount[] = [
    { id: 1, username: "user1", email: "user1@example.com" },
    { id: 2, username: "user2", email: "user2@example.com" },
    // Add more users as needed
];

const AdminAccountManagement: React.FC = () => {
    const accountsService = AccountsService.getInstance();

    const [users, setUsers] = useState<UserAccount[]>(usersData);
    const [selectedUserId, setSelectedUserId] = useState<number>(usersData[0].id);
    const [newUser, setNewUser] = useState<CreateAccountRequestDto>({ username: '', password: '' });
    const [accountDetails, setAccountDetails] = useState<AccountDetails>({ ...usersData[0], password: '' });

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = parseInt(e.target.value, 10);
        setSelectedUserId(userId);
        const user = users.find(user => user.id === userId);
        if (user) {
            setAccountDetails({ ...user, password: '' }); // Reset password field for security reasons
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccountDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updated Account Details:", accountDetails);
        // Here, you would typically send the updated details to the server
    };

    const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser(prevNewUser => ({
            ...prevNewUser,
            [name]: value,
        }));
    };

    const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Creating account:', newUser);
        // Here, you would typically send the newUser data to the server to create the account
        // After successful creation, you might want to fetch the updated user list

        accountsService.createAccount(newUser).then(() => {})
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Admin Account Management</h2>
            <select className={styles.userSelect} value={selectedUserId} onChange={handleUserChange}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                ))}
            </select>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    name="username"
                    value={accountDetails.username}
                    onChange={handleInputChange}
                />
                <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={accountDetails.email}
                    onChange={handleInputChange}
                />
                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={accountDetails.password}
                    onChange={handleInputChange}
                />
                <button className={styles.button} type="submit">Update Account</button>
            </form>

            <h3 className={styles.title}>Create New User</h3>
            <form onSubmit={handleCreateAccount} className={styles.form}>
                <input
                    className={styles.input}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleNewUserChange}
                />
                {/* <input
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleNewUserChange}
                /> */}
                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password} // Assuming password field is part of AccountDetails for simplicity
                    onChange={handleNewUserChange}
                />
                <button className={styles.button} type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default AdminAccountManagement;
