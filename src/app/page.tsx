import Navbar from "./components/navbar/Navbar";
import Posts from "./components/posts/Posts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Posts />
    </main>
  );
}
