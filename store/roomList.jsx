import create from "zustand";

const roomList = create(set => ({
  myRooms: null,
  rooms:null,

  setMyRooms: (prop) =>
      set((state) => ({myRooms: prop})),
  setRooms: (prop) =>
      set((state) => ({rooms: prop})),


}));

export default roomList;