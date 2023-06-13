import Slider from "react-slick";

// import ArrowLeftDark from "./ArrowLeftDark.png";
// import ArrowRightDark from "./ArrowRightDark.png";
// import ArrowLeftLight from "./ArrowLeftLight.png";
// import ArrowRightLight from "./ArrowRightLight.png";
import { useContext } from "react";
import { ThemeContext } from "../../Theme";
import "./Slider.css";
import cn from "classnames";

function SliderCarousel({ children }) {
  const { theme } = useContext(ThemeContext);
  function PrevArrow({ className, style, onClick }) {
    return (
      <div onClick={onClick} className={cn("arrow", className)}>
        {theme === "dark-theme" ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#ffffff'><title>menu-left</title><path d="M14,7L9,12L14,17V7Z" /></svg>
            <span>Назад</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#000000'><title>menu-left</title><path d="M14,7L9,12L14,17V7Z" /></svg>
            <span>Назад</span>
          </>
        )}
      </div>
    );
  }
  function NextArrow({ className, style, onClick }) {
    return (
      <div onClick={onClick} className={cn("arrow", className)}>
        {theme === "dark-theme" ? (
          <>
            <span>Далее</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#ffffff'><title>menu-right</title><path d="M10,17L15,12L10,7V17Z" /></svg>
          </>
        ) : (
          <>
            <span>Далее</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#000000'><title>menu-right</title><path d="M10,17L15,12L10,7V17Z" /></svg>
          </>
        )}
      </div>
    );
  }
  const config = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider className={"slider"} {...config}>
      {children}
    </Slider>
  );
}

export default SliderCarousel;
