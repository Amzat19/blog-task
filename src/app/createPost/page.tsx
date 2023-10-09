"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { addNewPost } from "@/redux/features/postsSlice";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addNewPost(formData));

    setFormData({ title: "", content: "" });

    router.push("/");
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className={styles.createPost}>
      <Link href="/">Go back</Link>
      <form onSubmit={handleFormSubmit}>
        <h2>Create a new post</h2>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="Title of your blog"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Content
          <textarea
            name="content"
            placeholder="Enter the content of your blog"
            value={formData.content}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
