"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import avatar from "../../../../public/avatar.jpeg";
import { useState } from "react";
import { addCommentToPost } from "@/redux/features/postsSlice";

export default function Post({ params }: { params: { id: string } }) {
  const postsData = useAppSelector((state) => state.posts.postsData);
  const post = postsData.find((post: postsDataType) => post.id === params.id);
  const dispatch = useAppDispatch();

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      return; // Don't add empty comments
    }

    dispatch(addCommentToPost({ postId: params.id, comment: newComment }));
    setNewComment("");
  };

  if (!post) {
    return (
      <div className={styles.postView}>
        <p className={styles.notFound}>Post not found.</p>
        <Link href="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div className={styles.postView}>
      <Link href="/">Go Back</Link>
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <span>{post.timestamp}</span>
      </article>
      <article className={styles.comments}>
        <h2>Comments</h2>
        {post.comments.map((comment) => {
          return (
            <div className={styles.comment} key={comment.id}>
              <div>
                <Image src={avatar} width={40} height={40} alt="Avatar" />
                <p>Default user</p>
              </div>
              <p>{comment.content}</p>
            </div>
          );
        })}
        <textarea
          name="comment"
          placeholder="Write a comment...."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button onClick={() => handleAddComment()}>Add Comment</button>
      </article>
    </div>
  );
}
