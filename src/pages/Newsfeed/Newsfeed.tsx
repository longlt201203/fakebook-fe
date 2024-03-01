// Newfeed.tsx
import { FormEvent, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import './Newsfeed.css'; // Make sure to create and import your CSS file
import { CommentSection } from './components/CommentSection';
import MDEditor from '@uiw/react-md-editor';

// This could be TypeScript or just a structure for your mock data
const posts = [
    {
        id: 1,
        author: {
            name: "Jane Doe",
            profilePictureUrl: "https://via.placeholder.com/150",
        },
        timestamp: new Date().toISOString(),
        content: "This is the content of the first post.",
        likes: 10,
        isEditing: false,
        comments: [
            { id: 1, author: "John Smith", content: "Great post!", isEditing: false },
            { id: 2, author: "Emily Johnson", content: "Thanks for sharing.", isEditing: false },
        ],
    },
    // ...more posts
];

const Newsfeed = () => {
    // Replace with actual fetching logic
    const [newsfeedPosts, setNewsfeedPosts] = useState(posts);
    const [postContent, setPostContent] = useState<string | undefined>('');

    const handlePostSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Post content:', postContent);
        // Here you would add logic to send the post content to your backend
        setPostContent(''); // Clear the input after submission
    };

    const handleCommentDelete = (postId, commentId) => {
        // Logic to delete the comment from the state and optionally update the backend
        console.log(`Deleting comment ${commentId} from post ${postId}`);
        // Update your state here
    };

    const handleCommentEdit = (postId, commentId, updatedContent) => {
        // Logic to update the comment content in the state and optionally update the backend
        console.log(`Editing comment ${commentId} from post ${postId} with new content: ${updatedContent}`);
        // Update your state here
    };

    const handlePostEditToggle = (postId) => {
        setNewsfeedPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId ? { ...post, isEditing: !post.isEditing } : post
            )
        );
    };

    const handlePostUpdate = (postId, updatedContent) => {
        console.log(`Updating post ${postId} with new content: ${updatedContent}`);
        // Here you would add logic to send the updated post content to your backend
        setNewsfeedPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId ? { ...post, content: updatedContent, isEditing: false } : post
            )
        );
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
                {newsfeedPosts.map((post) => (
                    <div key={post.id} className="post">
                        <div className="post-header">
                            <img src={post.author.profilePictureUrl} alt={`${post.author.name}'s profile`} className="profile-picture" />
                            <div>
                                <div className="author-name">{post.author.name}</div>
                                <div className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</div>
                                {post.isEditing ? (
                                    <button onClick={() => handlePostEditToggle(post.id)}>Cancel</button>
                                ) : (
                                    <button onClick={() => handlePostEditToggle(post.id)}>Edit</button>
                                )}
                            </div>
                        </div>
                        <hr />
                        {post.isEditing ? (
                            <div className="post-content-edit">
                                <MDEditor
                                    value={post.content}
                                    onChange={(updatedContent) => handlePostUpdate(post.id, updatedContent)}
                                />
                                <button onClick={() => handlePostUpdate(post.id, post.content)}>Update</button>
                                <button onClick={() => handlePostEditToggle(post.id)}>Cancel</button>
                            </div>
                        ) : (
                            <div className="post-content">
                                <MDEditor.Markdown source={post.content} />
                            </div>
                        )}
                        <div className="post-actions">
                            <span>{post.likes} Likes</span>
                            <span>{post.comments.length} Comments</span>
                        </div>
                        <CommentSection
                            postId={post.id}
                            comments={post.comments}
                            onCommentSubmit={(commentContent) => console.log('Posting comment:', commentContent)}
                            onCommentEdit={handleCommentEdit}
                            onCommentDelete={handleCommentDelete}
                        />
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default Newsfeed;
