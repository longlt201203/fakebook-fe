// Newfeed.tsx
import { FormEvent, useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import './Newsfeed.css';
import MDEditor from '@uiw/react-md-editor';
import Post from '../../components/Post/Post';
import { PostResponseDto } from '../../dto/posts/responses/post-response.dto';
import { PostsService } from '../../services/posts.service';
import { useCheckProfile } from '../../hooks/useCheckProfile';
import { PaginationDto } from '../../dto/pagination.dto';
import { AxiosError } from 'axios';
import FriendRecommendation from '../../components/FriendRecommendation/FriendRecommendation';

const Newsfeed = () => {
    // Replace with actual fetching logic
    const [profile, setProfile, accessToken] = useCheckProfile();
    const postsService = PostsService.getInstance();

    const [newsfeedPosts, setNewsfeedPosts] = useState<PostResponseDto[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [nextPage, setNextPage] = useState<number | undefined>();
    const [postContent, setPostContent] = useState<string | undefined>('');

    const fetchPost = (page: number) => {
        postsService
            .fetchPosts({ page: page, take: 10 }, accessToken)
            .then((data) => {
                if (data.page != currentPage) {
                    const tmp = [];
                    tmp.push(...newsfeedPosts);
                    tmp.push(...data.data);
                    setNewsfeedPosts(tmp);
                    setCurrentPage(data.page);
                }
                if (data.nextPage) {
                    setNextPage(data.nextPage);
                } else {
                    setNextPage(undefined);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchPost(1);
    }, []);

    const handlePostSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Here you would add logic to send the post content to your backend
        postsService.createPost({ content: postContent ?? "" }, accessToken)
            .then(data => {
                // fetchPost(1);
                alert("Post successfully!")
            })
            .catch(err => {
                if (err instanceof AxiosError) {
                    alert(err.response?.data.message);
                } else {
                    console.log(err);
                    alert("Unknow Error!");
                }
            })

        setPostContent('');
    };

    const handleMore = () => {
        fetchPost(nextPage ?? currentPage);
    }

    return (
        <MainLayout>
            <div className="app-container">
                <FriendRecommendation accountId={profile.id} accessToken={accessToken} /* pass necessary props */ />
                <div className="newsfeed">
                    <MDEditor
                        value={postContent}
                        onChange={setPostContent}
                        style={{ marginBottom: "20px", marginTop: "20px" }}
                    />
                    <form className="post-form" onSubmit={handlePostSubmit}>
                        <textarea
                            className="post-input"
                            placeholder="What's on your mind?"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        ></textarea>
                        <button type="submit" className="post-submit">Post</button>
                    </form>
                    {newsfeedPosts.map((post) => (
                        <Post key={post.id} post={post} currentUserId={profile.id} accessToken={accessToken} />
                    ))}
                    {nextPage ? (<button type='button' onClick={() => handleMore()}>More</button>) : ''}
                </div>
            </div>
        </MainLayout>
    );
};

export default Newsfeed;
