import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import appState from "../store/appState";
import { formatDate } from "../utils/formateDate";
import styles from "./VKTvView.module.css";
import {useEffect} from "react";
import Header from "../components/Header/Header";

const VKTvView = observer(() => {
  const navigate = useNavigate();

  const handleHomeLinkClick = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  useEffect(()=>{
      window.scrollTo(0, 0);
  }, [])

  return (
    <>
    <Header/>
    <main className={styles.wrapper}>
      <header>
        <Link to="/" className={styles.homeLink} onClick={handleHomeLinkClick}>
          Назад
        </Link>
      </header>
      <h1 className={styles.title}>ВК ТВ:</h1>
      <div className={styles.container}>
        {appState.VKTvItems.map((item) => (
          <div key={item._id} className={styles.item}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemDate}>{formatDate(item.date)}</p>
            <div
              className={styles.frameContainer}
              dangerouslySetInnerHTML={{ __html: item.frameContent }}
            ></div>
          </div>
        ))}
      </div>
    </main>
    </>
  );
});

export default VKTvView;
