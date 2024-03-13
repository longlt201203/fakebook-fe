import React, { useState, useEffect, useId, FormEvent } from 'react';
import UserFeedProfile from './components/UserFeedProfile';
import { AccountResponseDto } from '../../dto/accounts/responses/account-response.dto';
import { PaginationDto } from '../../dto/pagination.dto';
import { PostResponseDto } from '../../dto/posts/responses/post-response.dto';
import Post from '../../components/Post/Post';
import { AccountsService } from '../../services/accounts.service';
import { PostsService } from '../../services/posts.service';
import { useCheckProfile } from '../../hooks/useCheckProfile';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout';
import { AxiosError } from 'axios';
import MDEditor from '@uiw/react-md-editor';

const UserFeed = () => {
    const { accountId } = useParams<{ accountId: string }>()

    const [profile, setProfile, accessToken] = useCheckProfile();

    const postsService = PostsService.getInstance();
    const accountsService = AccountsService.getInstance();

    const [postsData, setPostsData] = useState<PaginationDto<PostResponseDto>>();
    const [newPostContent, setNewPostContent] = useState<string | undefined>('');
    const [userProfile, setUserProfile] = useState<AccountResponseDto>();

    const fetchPost = () => {
        if (accountId) {
            postsService
                .fetchPostsByAuthor(accountId, { page: 1, take: 10 }, accessToken)
                .then((data) => {
                    setPostsData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        if (accountId) {
            accountsService
                .findAccountById(accountId, accessToken)
                .then((data) => {
                    setUserProfile(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        fetchPost();
    }, [accountId]);

    const handleNewPostSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Here you would add logic to send the post content to your backend
        postsService.createPost({ content: newPostContent ?? "" }, accessToken)
            .then(data => {
                fetchPost();
            })
            .catch(err => {
                if (err instanceof AxiosError) {
                    alert(err.response?.data.message);
                } else {
                    console.log(err);
                    alert("Unknow Error!");
                }
            })

        setNewPostContent('');
    };

    return (
        <MainLayout>
            <div className="user-feed-container">
                {userProfile ? <UserFeedProfile user={userProfile} /> : ''}
                <div className="user-feed">
                    <MDEditor
                        value={newPostContent}
                        onChange={setNewPostContent}
                        style={{ marginBottom: "20px", marginTop: "20px" }}
                    />
                    <form className="post-creation" onSubmit={handleNewPostSubmit}>
                        {/* <textarea
                            placeholder="What's on your mind?"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                        ></textarea> */}
                        <button type="submit">Post</button>
                    </form>
                    <div className="posts-list">
                        {postsData?.data.map(post => (
                            <Post key={post.id} post={post} currentUserId={profile.id} accessToken={accessToken} />
                        ))}
                        <button type='button'>More</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default UserFeed;
