import { useCheckProfile } from '../../hooks/useCheckProfile';
import './Header.css'; // Make sure you have the CSS file
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [profile, setProfile, accessToken] = useCheckProfile({ noRedirect: true });
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement your logout logic here
        console.log('Logging out...');

        window.localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <header className="fakebook-header">
            <div className="logo-container">
                <img src="/path-to-your-logo.png" alt="Fakebook Logo" />
                <span className="logo-text">Fakebook</span>
            </div>
            {
                profile.id ? (
                    <div className="profile-logout-section">
                        <span className="username">{profile.username}</span>
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
