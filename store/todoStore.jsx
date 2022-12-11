import create from "zustand";

const todoStore = create(set => ({
  todoDatas: null,

  setTodoDatas: (prop) =>
      set((state) => ({todoDatas: prop})),

}));

export default todoStore;