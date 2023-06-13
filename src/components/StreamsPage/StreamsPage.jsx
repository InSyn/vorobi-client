import { Link, useNavigate } from "react-router-dom";
import styles from "./StreamsPage.module.css";

const StreamsPage = () => {
  const navigate = useNavigate();

  const handleHomeLinkClick = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <Link
        to="/"
        className={styles.backLink}
        onClick={handleHomeLinkClick}
      >
        На главную
      </Link>
      <iframe className={styles.frame} src="https://rtsp.me/embed/NenAsNKG/" title="первая трансляция"></iframe>
      <iframe className={styles.frame} src="https://rtsp.me/embed/nDFs7nr3/" title="вторая трансляция"></iframe>
    </div>
  );
};

export default StreamsPage;
