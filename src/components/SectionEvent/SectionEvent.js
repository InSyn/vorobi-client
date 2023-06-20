import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appState from "../../store/appState";
import { formatDate } from "../../utils/formateDate";
import Calendar from "../Calendar/Calendar";
import styles from "./SectionEvent.module.css";
import Triangle from "./triangle.png";
import {ReactComponent as ArrowIcon} from "./../../svg/arrow-icon.svg";

const SectionEvent = observer(() => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date());

  const [prevEvent, setPrevEvent] = useState();
  const [nextEvent, setNextEvent] = useState();

  useEffect(() => {
    const TODAY_DATE = new Date().toDateString();
    // const TODAY_DATE_TIMESTAMP = Date.parse(new Date().toDateString());

    setActiveEvents(
      appState.events.filter(
        (event) => {
          return  new Date(event.date).toDateString() === TODAY_DATE
        }
      )
    );
    // eslint-disable-next-line
  }, [setActiveEvents, appState.events]);

  useEffect(()=>{
    const prevEvents =  appState.events.filter(event => Date.parse(event.date) < Date.parse(activeDate.toDateString()))
    if (prevEvents.length > 0) { setPrevEvent(prevEvents[prevEvents.length - 1]) }

    const nextFoundEvent = appState.events.find(event =>
        (Date.parse(event.date) > Date.parse(activeDate.toDateString())) &&
        (new Date(event.date).toDateString() !== activeDate.toDateString())
    )
    if (nextFoundEvent) { setNextEvent(nextFoundEvent) }
    // eslint-disable-next-line
  }, [setPrevEvent, setNextEvent, activeDate, appState.events])

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
          </div>

          <div className={styles.Events}>
            {
              prevEvent &&
                <div className={styles.EventWrapper}>
                  <div className={styles.EventDate}>
                    {formatDate(prevEvent.date)}
                  </div>
                  <Link
                      className={styles.Event}
                      to={`/event/${prevEvent._id}`}
                      key={prevEvent._id}
                  >
                    {prevEvent.title}
                    <ArrowIcon className={styles.arrowIcon}/>
                  </Link>
                </div>
            }

            <div className={styles.EventWrapper}>
              <div className={styles.LeftDate}>{formatDate(activeDate)}</div>
              {activeEvents.length ? (
                activeEvents.map((event) => (
                  <Link
                    className={styles.Event}
                    to={`/event/${event._id}`}
                    key={event._id}
                  >
                    {event.title}
                    <ArrowIcon className={styles.arrowIcon}/>
                  </Link>
                ))
              ) : (
                <p className={styles.EventsPlaceholder}>
                  В этот день событий нет
                </p>
              )}
            </div>

            {
              nextEvent &&
                <div className={styles.EventWrapper}>
                  <div className={styles.EventDate}>
                    {formatDate(nextEvent.date)}
                  </div>
                  <Link
                      className={styles.Event}
                      to={`/event/${nextEvent._id}`}
                      key={nextEvent._id}
                  >
                    {nextEvent.title}
                    <ArrowIcon className={styles.arrowIcon}/>
                  </Link>
                </div>
            }
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
