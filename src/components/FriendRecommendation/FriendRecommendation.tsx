import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Globals } from '../../utils/Globals';
import "./FriendRecommendation.css"
import { AccountResponseDto } from '../../dto/accounts/responses/account-response.dto';
import { AnalyticsService } from '../../services/analytics.service';
import { RelationshipsService } from '../../services/relationships.service';

const FriendRecommendation = (props: PropsWithChildren<{
    accountId: string,
    accessToken: string
}>) => {
    const analyticsService = AnalyticsService.getInstance();
    const relationshipsService = RelationshipsService.getInstance();
    const [recommendations, setRecommendations] = useState<AccountResponseDto[]>([]);

    const fecthFriendRecommendations = () => {
        analyticsService
            .getFriendRecommendations(props.accountId)
            .then(data => setRecommendations(data))
            .catch(err => {});
    }

    useEffect(() => {
        if (props.accountId) {
            fecthFriendRecommendations();
        }
    }, [props.accountId]);

    const handleAddFriend = (friendId: string) => {
        // fecthFriendRecommendations();
        relationshipsService
            .addFriend(friendId, props.accessToken)
            .then(data => {
                fecthFriendRecommendations();
            })
            .catch(err => {

            });
    }

    return (
        <div className="friend-recommendation">
            <h3>Friend Recommendations</h3>
            <ul>
                {recommendations.map(friend => (
                    <li key={friend.id} className="recommendation-item">
                        <div className="friend-avatar">
                            <img src={friend.detail?.avt || Globals.DEFAULT_IMAGE} alt={`${friend.detail?.fname}'s avatar`} />
                        </div>
                        <div className="friend-info">
                            <div className="friend-name"><Link to={`/user/${friend.id}`}>{friend.detail?.fname} {friend.detail?.lname}</Link></div>
                        </div>
                        <button className="add-friend-button" onClick={() => handleAddFriend(friend.id)}>Add Friend</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRecommendation;