import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_ADDRESS } from "../../constants";
import appState from "../../store/appState";
import styles from "./PostListView.module.css";

const PostListView = observer(() => {
  const navigate = useNavigate();

  const [foundPosts, setFoundPosts] = useState(appState.posts);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceHandler = setTimeout(async () => {
      if (searchTerm) {
        const searchRequest = await axios.get(
          `${SERVER_ADDRESS}/api/posts-search?q=${searchTerm}`
        );

        if (searchRequest.data) {
          setFoundPosts(searchRequest.data);
        }
      } else {
        setFoundPosts(appState.posts);
      }
    }, 400);

    return () => clearTimeout(delayDebounceHandler);
  }, [searchTerm]);

  const handleHomeLinkClick = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.homeLink} onClick={handleHomeLinkClick}>
          Назад
        </Link>
        <input
          type="text"
          placeholder="Найти новость..."
          className={styles.searchInput}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </header>
      <div className={styles.list}>
        {foundPosts.map((post) => (
          <div className={styles.item} key={post._id}>
            <Link to={`/post/${post._id}`}>
              <h4 className={styles.itemTitle}>{post.title}</h4>
            </Link>
            <p
              className={styles.itemDescription}
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></p>
          </div>
        ))}
      </div>
    </main>
  );
});

export default PostListView;
