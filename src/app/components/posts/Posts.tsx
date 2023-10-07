"use client";
import { useState } from "react";
import styles from "./Posts.module.css";
import postsData, { postsDataType } from "@/utils/postData";
import Link from "next/link";

export default function Posts() {
  const postsPerPage = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const filteredPosts = postsData.filter((post: postsDataType) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <section className={`${styles.posts} container`}>
      <h2>All Posts</h2>
      <input
        type="search"
        name="search"
        placeholder="Search for posts by title"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className={styles.postwrapper}>
        {currentPosts.map((post: postsDataType) => {
          return (
            <article className={styles.post} key={post.id}>
              <Link href={`post/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p>{post.content}</p>
              <span>{post.timestamp}</span>
            </article>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
