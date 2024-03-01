// CommentSection.js or CommentSection.tsx
import { useState } from 'react';

export const CommentSection = ({ postId, comments, onCommentSubmit, onCommentDelete, onCommentEdit }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCommentSubmit(newComment);
        setNewComment('');
    };

    return (
        <div className="comment-section">
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    {comment.isEditing ? (
                        <input type="text" value={comment.content} /* Handle onChange for editing */ />
                    ) : (
                        <>
                            <strong>{comment.author}:</strong> {comment.content}
                        </>
                    )}
                    <button onClick={() => onCommentEdit(postId, comment.id)}>Edit</button>
                    <button onClick={() => onCommentDelete(postId, comment.id)}>Delete</button>
                </div>
            ))}
            <form onSubmit={handleSubmit} className="comment-form">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};
