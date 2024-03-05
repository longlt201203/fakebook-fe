import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globals } from '../../utils/Globals';
import "./FriendRecommendation.css"

// A mock function to simulate fetching data from an API.
const fetchFriendRecommendations = () => {
    // This would be replaced with an actual API call.
    // Note that 'avatarUrl' is added to each friend object.
    return Promise.resolve([
        { id: 1, name: "Alice Smith", mutualFriends: 4, avatarUrl: Globals.DEFAULT_IMAGE },
        { id: 2, name: "Bob Jones", mutualFriends: 3, avatarUrl: Globals.DEFAULT_IMAGE },
        { id: 3, name: "Charlie Johnson", mutualFriends: 2, avatarUrl: Globals.DEFAULT_IMAGE },
        // Add more mock friends with their avatars
    ]);
};

const FriendRecommendation = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetchFriendRecommendations().then(data => {
            setRecommendations(data);
        });
    }, []);

    return (
        <div className="friend-recommendation">
            <h3>Friend Recommendations</h3>
            <ul>
                {recommendations.map(friend => (
                    <li key={friend.id} className="recommendation-item">
                        <div className="friend-avatar">
                            <img src={friend.avatarUrl} alt={`${friend.name}'s avatar`} />
                        </div>
                        <div className="friend-info">
                            <div className="friend-name"><Link to="/feed">{friend.name}</Link></div>
                        </div>
                        <button className="add-friend-button">Add Friend</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRecommendation;