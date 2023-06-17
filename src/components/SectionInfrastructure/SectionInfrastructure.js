import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import appState from "../../store/appState";
import SliderCarousel from "../Slider/Slider";
import styles from "./SectionInfrastructure.module.css";
import Triangle from "./Triangle.png";
import {ReactComponent as ArrowIcon} from "./../../svg/arrow-icon.svg";

const SectionInfrastructure = observer(() => {
  return (
    <section className={styles.Section} id="infrastructure">
      <div className={styles.Left}>
        <div className={styles.LeftContent}>
          <h1 className={styles.Title}>ИНФРАСТРУКТУРА</h1>
          <ul className={styles.List}>
            {appState.infrastructureItems.map((item, i_idx) => (
              <li className={styles.ListItem} key={i_idx}>
                <Link
                  className={styles.ListItemText}
                  to={`/infrastructure/${item._id}`}
                >
                  {item.title}

                  <ArrowIcon className={styles.ArrowIcon} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={classNames(styles.Right, "infrastructureSlider")}>
        <SliderCarousel>
          <div className={styles.RightContent}>
            <div className={styles.TrackName}>ЛЫЖЕРОЛЛЕРНАЯ ТРАССА</div>
            <div className={styles.TrackDistance}>2500 M</div>
            <div className={styles.Triangle}>
              <img src={Triangle} alt="Element" />
            </div>
          </div>
          <div className={styles.RightContent}>
            <div className={styles.TrackName}>ЛЫЖЕРОЛЛЕРНАЯ ТРАССА 2</div>
            <div className={styles.TrackDistance}>1400 M</div>
            <div className={styles.Triangle}>
              <img src={Triangle} alt="Element" />
            </div>
          </div>
          <div className={styles.RightContent}>
            <div className={styles.TrackName}>ЛЫЖЕРОЛЛЕРНАЯ ТРАССА 3</div>
            <div className={styles.TrackDistance}>1300 M</div>
            <div className={styles.Triangle}>
              <img src={Triangle} alt="Element" />
            </div>
          </div>
        </SliderCarousel>
      </div>
    </section>
  );
});

export default SectionInfrastructure;
