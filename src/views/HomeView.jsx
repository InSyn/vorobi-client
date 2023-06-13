import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import SectionCenter from "../components/SectionCenter/SectionCenter";
import SectionContact from "../components/SectionContact/SectionContact";
import SectionEvent from "../components/SectionEvent/SectionEvent";
import SectionInfrastructure from "../components/SectionInfrastructure/SectionInfrastructure";
import SectionVK from "../components/SectionVK/SectionVK";
import Main from "../components/Main/Main";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Main>
        <SectionEvent />
        <SectionCenter />
        <SectionInfrastructure />
        <SectionContact />
        <SectionVK />
        <Footer />
      </Main>
    </>
  );
};

export default Home;
