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

const Newsfeed = () => {
    // Replace with actual fetching logic
    const [profile, setProfile, accessToken] = useCheckProfile();
    const postsService = PostsService.getInstance();

    const [postsData, setPostsData] = useState<PaginationDto<PostResponseDto>>();
    // const [newsfeedPosts, setNewsfeedPosts] = useState(posts);
    const [postContent, setPostContent] = useState<string | undefined>('');

    const fetchPost = () => {
        postsService
            .fetchPosts({ page: 1, take: 10 }, accessToken)
            .then((data) => {
                setPostsData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchPost();
    }, []);

    const handlePostSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Here you would add logic to send the post content to your backend
        postsService.createPost({ content: postContent ?? "" }, accessToken)
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

        setPostContent('');
    };

    return (
        <MainLayout>
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
                {postsData?.data.map((post) => (
                    <Post key={post.id} post={post} currentUserId={profile.id} accessToken={accessToken} />
                ))}
            </div>
        </MainLayout>
    );
};

export default Newsfeed;
