import styles from "./Header.module.css";
import Logo from "./Лого_Воробьи_вверх.png";
import LogoLight from "./logoLight.png";
import Camera from "./Значок_камеры.png";
import CameraLight from "./cameraLight.png";
import PlayIcon from "./Кнопка_ТВ.png";
import cn from "classnames";
import { useCallback, useContext, useState } from "react";
import { ThemeContext } from "../../Theme";
import { Link } from "react-router-dom";
function Header() {
  const [menu, setMenu] = useState(false);
  const { theme } = useContext(ThemeContext);
  function toggleMenu() {
    if (!menu) {
      window.scrollTo({ top: 0 });
    }

    document.body.classList.toggle("no-scroll");

    setMenu((prev) => !prev);
  }

  function onClick() {
    toggleMenu();
  }

  const handleMenuClose = useCallback(() => {
    setMenu(false);
    document.body.classList.remove("no-scroll");
  }, []);

  return (
    <header className={styles.Header}>
      <div className={styles.Inner}>
        <div className={styles.Left}>
          <div style={{ display: "flex" }}>
            <Link to="/" className={styles.Logo}>
              <div className={styles.LogoElement}>
                {theme === "dark-theme" ? (
                  <img src={Logo} alt="logo" />
                ) : (
                  <img src={LogoLight} alt="logo" />
                )}
              </div>
            </Link>
            <Link to="/streams" className={styles.LogoCamera}>
              {theme === "dark-theme" ? (
                <img src={Camera} alt="logo" />
              ) : (
                <img src={CameraLight} alt="logo" />
              )}
            </Link>
          </div>

          <nav className={styles.Nav}>
            <ul className={styles.Menu}>
              <li>
                <a href="#events">СОБЫТИЯ</a>
              </li>
              <li>
                <a href="#news">ПРЕСС-ЦЕНТР</a>
              </li>
              <li>
                <a href="#infrastructure">ИНФРАСТРУКТУРА</a>
              </li>
              <li>
                <a href="#vk">ВКОНТАКТЕ</a>
              </li>
            </ul>
          </nav>

          <nav className={styles.MobileNav}>
            <div
              className={cn(styles.Hamburger, {
                [styles.Open]: menu,
              })}
              onClick={onClick}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
        <div className={styles.Right}>
          <Link to="/vk-tv"  className={styles.Channel}>
            <div className={styles.ChannelName}>ВОРОБЬИ.TV</div>
            <div className={styles.ChannelIcon}>
              <img src={PlayIcon} alt="play" />
            </div>
          </Link>
          <div className={styles.Contact}>
            <a href="#contacts">КОНТАКТЫ</a>
          </div>
        </div>
      </div>
      <div
        className={cn(styles.MobileMenu, {
          [styles.MobileMenuOpen]: menu,
        })}
      >
        <ul>
          <li>
            <a href="#events" onClick={handleMenuClose}>
              СОБЫТИЯ
            </a>
          </li>
          <li>
            <a href="#news" onClick={handleMenuClose}>
              ПРЕСС-ЦЕНТР
            </a>
          </li>
          <li>
            <a href="#infrastructure" onClick={handleMenuClose}>
              ИНФРАСТРУКТУРА
            </a>
          </li>
          <li>
            <a href="#contacts" onClick={handleMenuClose}>
              КОНТАКТЫ
            </a>
          </li>
          <li>
            <a href="#vk" onClick={handleMenuClose}>
              ВКОНТАКТЕ
            </a>
          </li>
        </ul>
        <Link
          to={"/vk-tv"}
          onClick={() => {
            document.body.classList.remove("no-scroll");
          }}
        >
          <div className={styles.Channel}>
            <div className={styles.ChannelName}>ВОРОБЬИ.TV</div>
            <div className={styles.ChannelIcon}>
              <img src={PlayIcon} alt="play" />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
