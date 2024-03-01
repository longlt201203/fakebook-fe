import MDEditor from "@uiw/react-md-editor";
import { PropsWithChildren } from "react";
import { CommentSection } from "../CommentSection/CommentSection";

const Post = (props: PropsWithChildren<{
    post: {
        id: number;
        author: {
            name: string;
            profilePictureUrl: string;
        };
        timestamp: string;
        content: string;
        likes: number;
        isEditing: boolean;
        comments: {
            id: number;
            author: string;
            content: string;
            isEditing: boolean;
        }[];
    }
}>) => {
    const post = props.post;

    return (
        <div className="post">
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
    )
}

export default Post;