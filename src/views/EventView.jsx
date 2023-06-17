import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SERVER_ADDRESS } from "../constants";
import appState from "../store/appState";
import { formatDate } from "../utils/formateDate";
import { ReactComponent as ExcelIcon } from "./assets/excel-icon.svg";
import { ReactComponent as PdfIcon } from "./assets/pdf-icon.svg";
import { ReactComponent as WordIcon } from "./assets/word-icon.svg";
import { ReactComponent as FileIcon } from "./assets/file-icon.svg";
import styles from "./DetailPage.module.css";
import Header from "../components/Header/Header";
import {ReactComponent as ArrowIcon} from "./../svg/arrow-icon.svg";

const EventView = observer(() => {
  const [event, setEvent] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const event = appState.events.find((event) => event._id === params.id);

    setEvent(event);
  }, [params.id]);

  const handleHomeLinkClick = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  if (!event) {
    return (
      <>
      <Header />
      <div className={styles.notFound}>
        <Link
          to="/"
          className={styles.notFoundHomeLink}
          onClick={handleHomeLinkClick}
        >
          На главную
        </Link>
        Страница не найдена
      </div>
      </>
    );
  }

  return (
    <>
    <Header />
    <main className={styles.wrapper}>
      <header>
        <Link to="/" className={styles.homeLink} onClick={handleHomeLinkClick}>
          <ArrowIcon className={styles.arrowIcon}></ArrowIcon>
          Назад
        </Link>
      </header>
      <section className={styles.content}>
        <div className={styles.info}>
          <h1 className={styles.title}>{event.title}</h1>
          <p className={styles.date}>{formatDate(event.date)}</p>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: event.description }}
          ></p>
        </div>
        {event.imageFilename ? (
          <img
            src={`${SERVER_ADDRESS}/static/${event.imageFilename}`}
            alt={event.title}
            className={styles.image}
          />
        ) : null}
      </section>
      {event.documents.length ? (
        <aside className={styles.documents}>
          <h4 className={styles.documentsTitle}>Прикрепленные документы:</h4>
          <ul className={styles.documentList}>
            {event.documents.map(({ actualFilename, serverFilename }) => {
              const filenameItems = actualFilename.split(".");
              const extension = filenameItems[filenameItems.length - 1];

              const Icon =
                extension === "pdf"
                  ? PdfIcon
                  : extension === "docx" || extension === "doc"
                  ? WordIcon
                  : extension === "xlsx" || extension === "xls"
                  ? ExcelIcon
                  : FileIcon;

              return (
                <li className={styles.documentItem} key={actualFilename}>
                  <a
                    target="_blank"
                    href={`${SERVER_ADDRESS}/static/${serverFilename}`}
                    rel="noreferrer"
                    className={styles.documentLink}
                  >
                    <Icon className={styles.documentIcon} />
                    <span className={styles.documentName}>
                      {actualFilename}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      ) : null}
    </main>
    </>
  );
});

export default EventView;
