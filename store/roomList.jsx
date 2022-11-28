import create from "zustand";

const roomList = create(set => ({
  rooms: null,
  setRooms: (prop) => set((state)=> ({rooms: prop})),
}))


export default roomList;