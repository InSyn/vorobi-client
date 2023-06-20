import { Link, useNavigate } from "react-router-dom";
import styles from "./StreamsPage.module.css";
import Header from "../Header/Header";
import {useEffect} from "react";
import {ReactComponent as ArrowIcon} from "./../../svg/arrow-icon.svg";

const StreamsPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    })

  const navigate = useNavigate();

  const handleHomeLinkClick = (event) => {
    event.preventDefault();

    navigate(-1);
  };

  return (
    <>
        <Header/>

        <div className={styles.container}>
            <Link to="/" className={styles.backLink} onClick={handleHomeLinkClick}>
                <ArrowIcon />
                На главную
            </Link>

            <div className={styles.cameraFrameWrapper}>
                <h2>Камера на стадионе</h2>
                <iframe className={styles.frame} src="https://rtsp.me/embed/NenAsNKG/" title="Камера на стадионе"></iframe>
            </div>

            <div className={styles.cameraFrameWrapper}>
                <h2>Камера на лыжной базе</h2>
                <iframe className={styles.frame} src="https://rtsp.me/embed/en2K9Q7d/" title="Камера на лыжной базе"></iframe>
            </div>
        </div>
    </>
  );
};

export default StreamsPage;
