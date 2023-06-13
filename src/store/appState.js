import { makeAutoObservable } from "mobx";

class AppState {
  posts = [];
  events = [];
  VKTvItems = [];
  infrastructureItems = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPosts(posts) {
    this.posts = posts;
  }

  setEvents(events) {
    this.events = events;
  }

  setVKTvItems(VKTvItems) {
    this.VKTvItems = VKTvItems;
  }

  setInfrastructureItems(infrastructureItems) {
    this.infrastructureItems = infrastructureItems;
  }
}

// eslint-disable-next-line
export default new AppState();
