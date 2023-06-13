import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appState from "../../store/appState";
import { formatDate } from "../../utils/formateDate";
import Calendar from "../Calendar/Calendar";
import styles from "./SectionEvent.module.css";
import Triangle from "./triangle.png";

const SectionEvent = observer(() => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date());

  useEffect(() => {
    const TODAY_DATE = new Date().toDateString();

    setActiveEvents(
      appState.events.filter(
        (event) => new Date(event.date).toDateString() === TODAY_DATE
      )
    );
    // eslint-disable-next-line
  }, [setActiveEvents, appState.events]);

  return (
    <section className={styles.Section} id="events">
      <div className={styles.Left}>
        <div className={styles.Content}>
          <div className={styles.ContentTop}>
            <Link
              to={"/events"}
              style={{ textDecoration: "underline", color: "#029fe2" }}
            >
              <h1 className={styles.Title}>СОБЫТИЯ</h1>
            </Link>
            <div className={styles.LeftDate}>{formatDate(activeDate)}</div>
          </div>

          <div className={styles.Events}>
            {activeEvents.length ? (
              activeEvents.map((event) => (
                <Link
                  className={styles.Event}
                  to={`/event/${event._id}`}
                  key={event._id}
                >
                  {event.title}
                </Link>
              ))
            ) : (
              <p className={styles.EventsPlaceholder}>
                В этот день событий нет
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.Right}>
        <div className={styles.RightContent}>
          <Calendar
            setActiveEvents={setActiveEvents}
            setActiveDate={setActiveDate}
          />
          <div className={styles.Triangle}>
            <img src={Triangle} alt="Element" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default SectionEvent;
