"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editPost } from "@/redux/features/postsSlice";

export default function EditPost({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [editFormData, setEditFormData] = useState({ title: "", content: "" });

  const post = useAppSelector((state) =>
    state.posts.postsData.find((post) => post.id === params.id)
  );

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(editPost({ id: params.id, ...editFormData }));

    router.push("/");
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Fetch the post data when the component mounts
    if (post) {
      setEditFormData({
        title: post.title,
        content: post.content,
      });
    } else {
      return;
    }
  }, [post]);

  return (
    <div className={styles.createPost}>
      <Link href="/">Go back</Link>
      <form onSubmit={handleFormSubmit}>
        <h2>Edit post</h2>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="Title of your blog"
            value={editFormData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Content
          <textarea
            name="content"
            placeholder="Enter the content of your blog"
            value={editFormData.content}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
