import create from "zustand";

const doingStore = create(set => ({
  doingDatas: null,

  setDoingDatas: (prop) =>
      set((state) => ({doingDatas: prop})),

}));

export default doingStore;