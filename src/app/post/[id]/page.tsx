"use client";
import { useAppSelector } from "@/redux/hooks";
import styles from "./page.module.css";
import Link from "next/link";

export default function Post({ params }: { params: { id: string } }) {
  const postsData = useAppSelector((state) => state.posts.postsData);
  const post = postsData.find((post: postsDataType) => post.id === params.id);

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
    </div>
  );
}
