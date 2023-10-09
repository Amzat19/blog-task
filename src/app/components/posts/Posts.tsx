"use client";

import styles from "./Posts.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deletePost,
  setCurrentPage,
  setSearchTerm,
} from "@/redux/features/postsSlice";

export default function Posts() {
  const postsPerPage = useAppSelector((state) => state.posts.postsPerPage);
  const currentPage = useAppSelector((state) => state.posts.currentPage);
  const searchTerm = useAppSelector((state) => state.posts.searchTerm);
  const postsData = useAppSelector((state) => state.posts.postsData);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const filteredPosts = postsData.filter((post: postsDataType) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <section className={`${styles.posts} container`}>
      <h2>All Posts</h2>
      <div className={styles.form}>
        <input
          type="search"
          name="search"
          placeholder="Search for posts by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => router.push("/createPost")}>
          Create new post
        </button>
      </div>

      <div className={styles.postwrapper}>
        {currentPosts.map((post: postsDataType) => {
          return (
            <article className={styles.post} key={post.id}>
              <Link href={`post/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p>{post.content}</p>
              <span>{post.timestamp}</span>
              <div className={styles.actions}>
                <button onClick={() => router.push(`/editPost/${post.id}`)}>
                  Edit Post
                </button>
                <button onClick={() => dispatch(deletePost(post.id))}>
                  Delete Post
                </button>
                <span>
                  {post.comments.length}{" "}
                  {post.comments.length === 1 ? "comment" : "comments"}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {filteredPosts.length ? totalPages : 1}
        </p>
        <button
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
