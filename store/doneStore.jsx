import create from "zustand";

const doneStore = create(set => ({
  doneDatas: null,

  setDoneDatas: (prop) =>
      set((state) => ({doneDatas: prop})),

}));

export default doneStore;