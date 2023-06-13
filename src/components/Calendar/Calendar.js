import styles from "./Calendar.module.css";
import cn from "classnames";
import ArrowLeftDark from "./ArrowLeftDark.png";
import ArrowRightDark from "./ArrowRightDark.png";
import ArrowLeftLight from "./ArrowLeftLight.png";
import ArrowRightLight from "./ArrowRightLight.png";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Theme";
import { observer } from "mobx-react-lite";
import appState from "../../store/appState";

const getMonthNameByIndex = (monthIndex) => {
  switch (monthIndex) {
    case 0:
      return "январь";
    case 1:
      return "февраль";
    case 2:
      return "март";
    case 3:
      return "апрель";
    case 4:
      return "май";
    case 5:
      return "июнь";
    case 6:
      return "июль";
    case 7:
      return "август";
    case 8:
      return "сентябрь";
    case 9:
      return "октябрь";
    case 10:
      return "ноябрь";
    case 11:
      return "декабрь";
    default:
      return "январь";
  }
};

const TODAY_DATE = new Date().toDateString();

const Calendar = observer(({ setActiveEvents, setActiveDate }) => {
  const { theme } = useContext(ThemeContext);
  const [calendarDate, setCalendarDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const newCells = [
      ...Array(calendarDate.getUTCDay())
        .fill(null)
        .map((_, index) => {
          const date =
            new Date(
              calendarDate.getFullYear(),
              calendarDate.getMonth(),
              0
            ).getDate() - index;

          const dateISOString = new Date(
            calendarDate.getFullYear(),
            calendarDate.getMonth() - 1,
            date
          ).toISOString();

          return dateISOString;
        })
        .reverse(),
      ...Array(
        new Date(
          calendarDate.getFullYear(),
          calendarDate.getMonth() + 1,
          0
        ).getDate()
      )
        .fill(null)
        .map((_, index) => {
          const dateISOString = new Date(
            calendarDate.getFullYear(),
            calendarDate.getMonth(),
            index + 1
          ).toISOString();

          return dateISOString;
        }),
    ];

    Array(42 - newCells.length)
      .fill(null)
      .forEach((_, index) => {
        const dateISOString = new Date(
          calendarDate.getFullYear(),
          calendarDate.getMonth() + 1,
          index + 1
        ).toISOString();

        newCells.push(dateISOString);
      });

    setCells(newCells);
  }, [setCells, calendarDate]);

  return (
    <div className={styles.Calendar}>
      <div className={styles.Date}>
        {getMonthNameByIndex(calendarDate.getMonth())}{" "}
        {calendarDate.getFullYear()}
      </div>
      <div className={styles.Inner}>
        <div className={styles.DateName}>ПН</div>
        <div className={styles.DateName}>ВТ</div>
        <div className={styles.DateName}>СР</div>
        <div className={styles.DateName}>ЧТ</div>
        <div className={styles.DateName}>ПТ</div>
        <div className={styles.DateName}>СБ</div>
        <div className={styles.DateName}>ВС</div>

        {cells.map((dateISOString) => {
          const events = appState.events.filter(
            (event) =>
              new Date(event.date).toDateString() ===
              new Date(dateISOString).toDateString()
          );

          const dateObject = new Date(dateISOString);

          const isSecondary = dateObject.getMonth() !== calendarDate.getMonth();
          const isCurrent = dateObject.toDateString() === TODAY_DATE;
          const isSelected = events.length !== 0;

          return (
            <button
              onClick={() => {
                setActiveDate(dateObject);
                setActiveEvents(events);
              }}
              key={dateISOString}
              className={cn(
                styles.Day,
                isSecondary && styles.SecondaryDay,
                isCurrent && styles.CurrentDay,
                isSelected && styles.SelectedDay
              )}
            >
              {dateObject.getDate()}
            </button>
          );
        })}

        <div
          className={styles.LeftArrow}
          onClick={() => {
            setCalendarDate(
              new Date(
                calendarDate.getFullYear(),
                calendarDate.getMonth() - 1,
                1
              )
            );
          }}
        >
          {theme === "dark-theme" ? (
            <img src={ArrowLeftDark} alt="Left" />
          ) : (
            <img src={ArrowLeftLight} alt="Left" />
          )}
        </div>
        <div
          className={styles.RightArrow}
          onClick={() => {
            setCalendarDate(
              new Date(
                calendarDate.getFullYear(),
                calendarDate.getMonth() + 1,
                1
              )
            );
          }}
        >
          {theme === "dark-theme" ? (
            <img src={ArrowRightDark} alt="Left" />
          ) : (
            <img src={ArrowRightLight} alt="Left" />
          )}
        </div>
      </div>
    </div>
  );
});

export default Calendar;
