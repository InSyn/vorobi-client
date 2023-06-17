import styles from "./SectionVK.module.css";
// import img1 from "./img1.png";
// import img2 from "./img2.png";
// import img3 from "./img3.png";
// import img4 from "./img4.png";
// import img5 from "./img5.png";
import Triangle from "./Triangle.png";
import Like from "./Like.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_ADDRESS } from "../../constants";
import {Link} from "react-router-dom";

// const FALLBACK_PHOTOS = [
//   { url: img1, likes: 5 },
//   { url: img2, likes: 8 },
//   { url: img3, likes: 13 },
//   { url: img4, likes: 21 },
//   { url: img5, likes: 34 },
// ];

function SectionVK() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (photos.length === 0) {
      (async () => {
        const photos = (await axios.get(`${SERVER_ADDRESS}/api/vk-photos`)).data

        if (!photos.error) {
          setPhotos(photos.photos);
        }
      })();
    }
  });

  return (
    <section className={styles.Section} id="vk">
      <div className={styles.Title}>ВКОНТАКТЕ</div>
      <div className={styles.Content}>
        <a
          href="https://vk.com/vorobiski"
          target="_blank"
          rel="noreferrer"
          className={styles.Name}
        >
          @vorobiski
        </a>
        <Link to="https://vk.com/albums-215673652" target="_blank" className={styles.Gallery}>
          {photos.map(({ url, likes }, index) => (
            <div className={styles[`GalleryItem${index + 1}`]} key={url}>
              <img
                src={url}
                className={styles.GalleryImg}
                alt="Фотография с ВКонтакте"
              />
              <div className={styles.Like}>
                <div className={styles.LikeIcon}>
                  <img src={Like} alt="" />
                </div>
                <div className={styles.Count}>{likes}</div>
              </div>
            </div>
          ))}
        </Link>
      </div>
      <div className={styles.Triangle}>
        <img src={Triangle} alt="" />
      </div>
    </section>
  );
}

export default SectionVK;
