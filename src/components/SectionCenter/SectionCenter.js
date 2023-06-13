import SliderCarousel from "../Slider/Slider";
import styles from "./SectionCenter.module.css";
import Triangle from "./triangle.png";
import newsPlaceholderImage from "./img1.jpg";
import { SERVER_ADDRESS } from "../../constants";
import { formatDate } from "../../utils/formateDate";
import { observer } from "mobx-react-lite";
import appState from "../../store/appState";
import { Link } from "react-router-dom";
import classNames from "classnames";

const SectionCenter = observer(() => {
  return (
    <section className={classNames(styles.Section, "news")} id="news">
      <h1 className={styles.Title}>
        <Link
          to="/posts"
          style={{ textDecoration: "underline", color: "#029fe2" }}
        >
          ПРЕСС-ЦЕНТР
        </Link>
      </h1>
      <SliderCarousel>
        {appState.posts.length
          ? appState.posts.map((post) => (
              <div className={styles.SliderItem} key={post._id}>
                <div className={styles.SectionContainer}>
                  <div className={styles.Left}>
                    <div className={styles.LeftContent}>
                      <div className={styles.Date}>{formatDate(post.date)}</div>

                      <Link
                        className={styles.Subtitle}
                        to={`/post/${post._id}`}
                      >
                        {post.title}
                      </Link>
                      <div
                        className={styles.Text}
                        dangerouslySetInnerHTML={{ __html: post.description }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.Right}>
                    <div className={styles.RightContent}>
                      <img
                        src={
                          post.imageFilename
                            ? `${SERVER_ADDRESS}/static/${post.imageFilename}`
                            : newsPlaceholderImage
                        }
                        alt={post.title}
                        className={styles.Image}
                      />
                      <div className={styles.Triangle}>
                        <img src={Triangle} alt="Element" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </SliderCarousel>
    </section>
  );
});

export default SectionCenter;
