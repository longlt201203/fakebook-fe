import { FormEvent, useEffect, useState } from 'react';
import { useCheckProfile } from '../../hooks/useCheckProfile';
import './Header.css'; // Make sure you have the CSS file
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Header = () => {
    const [profile, setProfile, accessToken] = useCheckProfile({ noRedirect: true });
    const [searchText, setSearchText] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement your logout logic here
        console.log('Logging out...');

        window.localStorage.removeItem("accessToken");
        navigate("/");
    };

    useEffect(() => {
        setSearchText(searchParams.get("search") || '');
    }, [searchParams]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchText) {
            searchParams.set("search", searchText.trim());
            navigate(`/search`);
            setSearchParams(searchParams);
        }
    }

    return (
        <header className="fakebook-header">
            <div className="logo-navbar-container">
                <div className="logo-container">
                    <img src="/src/assets/favicon.webp" alt="Fakebook Logo" />
                    <span className="logo-text">Fakebook</span>
                </div>
                <nav className="navbar">
                    <Link to="/feed">Home</Link>
                    {/* <Link to="/friends">Friends</Link> */}
                    {/* <Link to="/messages">Messages</Link> */}
                    {/* Add more links as needed */}
                </nav>
            </div>
            <div className=''>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder='Search' onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                    <button type='submit'>Search</button>
                </form>
            </div>
            {
                profile.id ? (
                    <div className="profile-logout-section">
                        <Link to="/profile"><span className="username">@{profile.username}</span></Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="login-link-section">
                        <Link to="/" className="login-link">Login</Link>
                    </div>
                )
            }
        </header>
    );
};

export default Header;
