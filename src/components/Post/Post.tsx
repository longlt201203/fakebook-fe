import MDEditor from "@uiw/react-md-editor";
import { PropsWithChildren, useState } from "react";
import { PostResponseDto } from "../../dto/posts/responses/post-response.dto";
import "./Post.css";
import { PostsService } from "../../services/posts.service";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

const Post = (props: PropsWithChildren<{
    post: PostResponseDto,
    currentUserId: string,
    accessToken: string
}>) => {
    const postsService = PostsService.getInstance();

    const post = props.post;
    const [isEditing, setIsEditing] = useState(false);
    const [originalContent, setOriginalContent] = useState(post.content);
    const [postContent, setPostContent] = useState<string | undefined>(post.content);

    const handlePostEditCancel = () => {
        setPostContent(originalContent);
        setIsEditing(false);
    }

    const handlePostContentChange = (updatedContent?: string) => {
        setPostContent(updatedContent);
    }

    const handlePostUpdate = () => {
        postsService
            .updatePost(post.id, { content: postContent ?? "" }, props.accessToken)
            .then((data) => {
                setOriginalContent(postContent ?? "");
                setIsEditing(false);
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    alert(err.response?.data.message);
                } else {
                    console.log(err);
                    alert("Unknow Error!");
                }
            });
    }

    return (
        <div className="post">
            <div className="post-header">
                <img src={post.author.detail?.avt || ""} alt={`@${post.author.username}'s profile`} className="profile-picture" />
                <div>
                    <div className="author-name"><Link to={`/user/${post.author.id}`}>@{post.author.username}</Link></div>
                    <div className="post-timestamp">{new Date(post.createdAt).toLocaleString()}</div>
                    {props.currentUserId == post.author.id ? isEditing ? (
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    ) : ''}
                </div>
            </div>
            <hr />
            {isEditing ? (
                <div className="post-content-edit">
                    <MDEditor
                        value={postContent}
                        onChange={(updatedContent) => handlePostContentChange(updatedContent)}
                    />
                    <button onClick={() => handlePostUpdate()}>Update</button>
                    <button onClick={() => handlePostEditCancel()}>Cancel</button>
                </div>
            ) : (
                <div className="post-content">
                    <MDEditor.Markdown source={postContent} />
                </div>
            )}
            {/* <div className="post-actions">
                <span>{post.likes} Likes</span>
                <span>{post.comments.length} Comments</span>
            </div> */}
            {/* <CommentSection
                postId={post.id}
                comments={post.comments}
                onCommentSubmit={(commentContent) => console.log('Posting comment:', commentContent)}
                onCommentEdit={handleCommentEdit}
                onCommentDelete={handleCommentDelete}
            /> */}
        </div>
    )
}

export default Post;