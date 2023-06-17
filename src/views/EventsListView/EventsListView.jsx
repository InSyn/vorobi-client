import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appState from "../../store/appState";
import styles from "./EventsListView.module.css";
import Header from "../../components/Header/Header";
import {ReactComponent as ArrowIcon} from "./../../svg/arrow-icon.svg";

const EventsListView = observer(() => {
  const navigate = useNavigate();

  const [foundEvents, setFoundEvents] = useState(appState.events);
  const [searchDay, setSearchDay] = useState(1);
  const [searchMonth, setSearchMonth] = useState(1);
  const [searchYear, setSearchYear] = useState(2023);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isNaN(+searchDay) && !isNaN(+searchMonth) && !isNaN(+searchYear)) {
      const searchDate = new Date(searchYear, searchMonth - 1, searchDay - 1);
      setFoundEvents(
        appState.events.filter((event) => {
          const eventDate = new Date(event.date);

          return (
            `${eventDate.toLocaleDateString()}` ===
            `${searchDate.toLocaleDateString()}`
          );
        })
      );
    }

    if (foundEvents.length === 0)
      setFoundEvents(appState.events)
  }, [searchDay, searchMonth, searchYear]);

  const handleHomeLinkClick = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  useEffect(() => {
    const nowDateObj = new Date();

    setSearchDay(nowDateObj.getDate());
    setSearchMonth(nowDateObj.getMonth() + 1);
    setSearchYear(nowDateObj.getFullYear());
  }, []);

  return (
    <>
    <Header />
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.homeLink} onClick={handleHomeLinkClick}>
          <ArrowIcon className={styles.arrowIcon}></ArrowIcon>
          Назад
        </Link>
        <div className={styles.inputsGroup}>
          <div className={styles.inputsItem}>
            <span>День:</span>
            <input
              type="number"
              min={1}
              max={31}
              className={styles.searchInput}
              onChange={(e) => setSearchDay(e.target.value)}
              value={searchDay}
            />
          </div>
          <div className={styles.inputsItem}>
            <span>Мес:</span>
            <input
              type="number"
              min={1}
              max={12}
              className={styles.searchInput}
              onChange={(e) => setSearchMonth(e.target.value)}
              value={searchMonth}
            />
          </div>
          <div className={styles.inputsItem}>
            <span>Год:</span>
            <input
              type="number"
              min={2000}
              className={styles.searchInput}
              onChange={(e) => setSearchYear(e.target.value)}
              value={searchYear}
            />
          </div>
        </div>
      </header>
      <div className={styles.list}>
        {foundEvents.map((event) => (
          <div className={styles.item} key={event._id}>
            <Link to={`/event/${event._id}`}>
              <h4 className={styles.itemTitle}>{event.title}</h4>
            </Link>
            <p
              className={styles.itemDescription}
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></p>
          </div>
        ))}
      </div>
    </main>
    </>
  );
});

export default EventsListView;
