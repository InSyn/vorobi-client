import { useContext, useEffect } from "react";
import { ThemeContext } from "./Theme";
import cn from "classnames";

import styles from "./App.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import appState from "./store/appState";
import axios from "axios";
import { SERVER_ADDRESS } from "./constants";
import HomeView from "./views/HomeView";
import PostView from "./views/PostView";
import EventView from "./views/EventView";
import StreamsPage from "./components/StreamsPage/StreamsPage";
import PostListView from "./views/PostListView/PostsListView";
import EventsListView from "./views/EventsListView/EventsListView";
import InfrastructureItemView from "./views/InfrastructureItemView";
import VKTvView from "./views/VKTvView";

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      const data = (await axios.get(`${SERVER_ADDRESS}/api/get-data`)).data;

      console.log(data)
      appState.setEvents(data.events);
      appState.setPosts(data.posts);
      appState.setVKTvItems(data.VKTvItems);
      appState.setInfrastructureItems(data.infrastructureItems);
    })();
  }, []);

  return (
    <div
      className={cn({
        [styles.DarkTheme]: theme === "dark-theme",
        [styles.LightTheme]: theme === "light-theme",
      })}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/event/:id" element={<EventView />} />
          <Route
            path="/infrastructure/:id"
            element={<InfrastructureItemView />}
          />
          <Route path="/streams" element={<StreamsPage />} />
          <Route path="/posts" element={<PostListView />} />
          <Route path="/events" element={<EventsListView />} />
          <Route path="/vk-tv" element={<VKTvView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
