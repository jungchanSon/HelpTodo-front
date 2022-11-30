import create from "zustand";

const roomData = create(set => ({
  roomName: null,
  roomCreateDate: null,
  roomCreator: null,

  setRoomName: (prop) =>
      set((state) => ({roomName: prop})),
  setRoomCreateDate: (prop) =>
      set((state) => ({roomCreateDate: prop})),
  setRoomCreator: (prop) =>
      set((state) => ({roomCreator: prop})),

}));

export default roomData;