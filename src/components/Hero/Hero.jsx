import Switch from "../Switch/Switch";
import styles from "./Hero.module.css";
import Meteo from "./Meteo";
// import bgImage1 from "./assets/hero-1.jpg";
// import bgImage2 from "./assets/hero-2.jpg";
// import bgImage3 from "./assets/hero-3.jpg";
import bgVideo from  "./assets/bg_video.webm"
import classNames from "classnames";
import { useEffect, useState } from "react";

function Hero() {
  const [activeBgImage, setActiveBgImage] = useState(0)
  
  useEffect(() => {
    setInterval(() => {
      setActiveBgImage(activeBgImage => (activeBgImage + 1) % 3)
    }, 3000);
  }, [setActiveBgImage])
  
  return (
    <section className={styles.Hero}>
      <div className={styles.bg} data-active-image-index={activeBgImage}>
        <video autoPlay muted loop id="myVideo"
               className={classNames(styles.bgImage, styles.bgImage1)}>
          <source src={bgVideo} type="video/mp4"></source>
        </video>
        {/*<img*/}
        {/*  src={bgImage1}*/}
        {/*  alt="Фоновая картинка 1"*/}
        {/*  className={classNames(styles.bgImage, styles.bgImage1)}*/}
        {/*/>*/}
        {/*<img*/}
        {/*  src={bgImage2}*/}
        {/*  alt="Фоновая картинка 2"*/}
        {/*  className={classNames(styles.bgImage, styles.bgImage2)}*/}
        {/*/>*/}
        {/*<img*/}
        {/*  src={bgImage3}*/}
        {/*  alt="Фоновая картинка 3"*/}
        {/*  className={classNames(styles.bgImage, styles.bgImage3)}*/}
        {/*/>*/}
      </div>
      <div className={styles.HeroContent}>
        <div className={styles.Top}>
          <Meteo />
          <Switch />
        </div>
        <div className={styles.Content}>
          <div className={styles.Text}>
            СПОРТИВНЫЙ ЛЫЖНЫЙ КЛУБ
            <br /> ДОСТУПНЫЙ КАЖДОМУ
          </div>
          <a href="#news" className={styles.Button}>
            ПОДРОБНЕЕ
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
