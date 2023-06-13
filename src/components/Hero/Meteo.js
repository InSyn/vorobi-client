import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import axios from "axios";

function Meteo() {
  const [data, setData] = useState({
    air: null,
    snow: null,
    humidity: null,
    wind: null,
  });
  useEffect(() => {
    axios.get("https://meteo.shopping24.su/").then((response) => {
      setData({
        air: response.data.t,
        snow: response.data.ts,
        humidity: response.data.h,
        wind: response.data.s,
      });
    });
  }, []);

  return (
    <div className={styles.Meteo}>
      <div className={styles.MeteoIcon}>{data.air}&deg;C</div>
      <div className={styles.MeteoInfo}>
        <div className={styles.MeteoNames}>
          <div className={styles.MeteoName}>t снег:</div>
          <div className={styles.MeteoName}>влаж:</div>
          <div className={styles.MeteoName}>ветер:</div>
        </div>
        <div className={styles.MeteoValues}>
          <div className={styles.MeteoValue}>{data.snow}&deg;C</div>
          <div className={styles.MeteoValue}>{data.humidity}%</div>
          <div className={styles.MeteoValue}>{data.wind}м/с</div>
        </div>
      </div>
    </div>
  );
}

export default Meteo;
