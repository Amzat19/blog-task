import postsData, { postsDataType } from "@/utils/postData";
import styles from "./page.module.css";
import Link from "next/link";

export default function Post({ params }: { params: { id: number } }) {
  const post = postsData.find(
    (post: postsDataType) => post.id === Number(params.id)
  );

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
